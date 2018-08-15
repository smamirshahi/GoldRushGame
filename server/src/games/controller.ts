import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, /* Board */ } from './entities'
import {/* IsBoard, */ /* isValidTransition, */ calculateWinner, /* finished */ } from './logic'
// import { Validate } from 'class-validator'
import { io } from '../index'
// import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

// class GameUpdate {

// @Validate(IsBoard, {
//   message: 'Not a valid board'
// })
// board: Board
// }

@JsonController()
export default class GameController {

  @Authorized() // make a new game
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User,
    @Body() game1: Game
    // @Body() game: Game
  ) {
    // console.log(`created user ${user.firstName}`)
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
    // @CreateDateColumn()
    // @UpdateDateColumn()
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
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    // @UpdateDateColumn()
    @Body() update: Partial<Game>
    // @Body() score: string | number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    // if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    // if (!isValidTransition(player.symbol, game.board, update.board)) {
    //   throw new BadRequestError(`Invalid move`)
    // }    

    // const winner = calculateWinner(update.board)
    // if (winner) {
    //   game.winner = winner
    //   game.status = 'finished'
    // }
    // else if (finished(update.board)) {
    //   game.status = 'finished'
    // }
    // else {
    //   game.turn = player.symbol === 'x' ? 'o' : 'x'
    // }
    console.log(`you pressed a button with the value of: ${update.score1}`)
    game.updatedAt = Date.now() - Number(game.createdAt)
    if (game.updatedAt < 3000000) {
      game.clickedBy = player.playerNumber
      if (game.clickedBy.indexOf("P1") === 0) {
        console.log(typeof(game.score1))
        game.score1 = game.score1 + update.score1
        // console.log(game.score1)
      }
      if (game.clickedBy.indexOf("P2") === 0) {
        console.log(typeof(game.score2))
        game.score2 = game.score2 + update.score1
        // console.log(update.score1)
      }
    }
    if (game.updatedAt > 30000) {
      const winner = calculateWinner(game.score1, game.score2)
      game.winner = winner
      game.status = 'finished'
    }

    // console.log(`game clicked by ${game.clickedBy.indexOf("P1")}`)
    // console.log(`game clicked by ${game.clickedBy.indexOf("P2")}`)
    // console.log(game.clickedBy)
    // console.log(`game clicked by ${game.clickedBy}`)
    // console.log(`clicked person ${user.firstName}`)
    // console.log(`clicked person ${player.playerNumber}`)
    // game.playerNumber = user.firstName;
    await game.changeBoard()
    // game.board = update.board // update the board
    await game.save()

    io.emit('action', { //telling the frontend to update the game
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

