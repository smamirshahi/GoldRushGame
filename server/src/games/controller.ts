import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player } from './entities'
import { calculateWinner } from './logic'
import { io } from '../index'

@JsonController()
export default class GameController {

  @Authorized() // make a new game
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User,
    @Body() game1: Game
  ) {
    await game1.changeBoard()
    const entity = await game1.save()

    await Player.create({
      game: entity,
      user,
      playerNumber: 'P1'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)

  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    game.createdAt = Date.now().toString()
    await game.save()

    const player = await Player.create({
      game,
      user,
      playerNumber: 'P2'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized() // update the game after user clicks
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    game.updatedAt = Date.now() - Number(game.createdAt)
    if (game.updatedAt < 30000) {
      game.clickedBy = player.playerNumber
      game.gameRound = game.gameRound + 1
      if (!!update.score1 && game.clickedBy.indexOf("P1") === 0) {
        game.score1 = game.score1 + update.score1
      }
      if (!!update.score1 && game.clickedBy.indexOf("P2") === 0) {
        game.score2 = game.score2 + update.score1
      }
    }
    else {
      const winner = calculateWinner(game.score1, game.score2)
      game.winner = winner
      game.status = 'finished'
    }

    await game.changeBoard()
    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized() // enters the game that the user selected
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized() // return the list of games
  @Get('/games')
  getGames() {
    return Game.find()
  }
}
