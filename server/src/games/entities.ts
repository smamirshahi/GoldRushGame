import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne/* , CreateDateColumn, UpdateDateColumn */ } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type PlayerNumber = 'P1' | 'P2'

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { nullable: true })
  board: Number[][]

  @Column('int', { default: '1' })
  gameRound: number

  @Column({ length: 8, default: 'P1' })
  clickedBy: PlayerNumber

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: number;

  @Column('int', { default: '0' })
  score1: number

  @Column('int', { default: '0' })
  score2: number

  @Column({ length: 8, nullable: true })
  winner: string

  @Column('text', { default: 'pending' })
  status: Status

  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]

  async changeBoard() {
    const emptyBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    function randomNumber(length1, length2) {
      let a1 = [Math.floor(Math.random() * length1), Math.floor(Math.random() * length2)]
      return a1
    }

    let array1 = new Array()
    for (let i = 0; i < Math.min(Math.floor(this.gameRound * 2.5), emptyBoard.length * emptyBoard[0].length); i++) {
      let newArray = randomNumber(emptyBoard.length, emptyBoard[0].length)
      array1.push(newArray)
    }

    let randScore1 = randomNumber(emptyBoard.length, emptyBoard[0].length)
    emptyBoard[randScore1[0]][randScore1[1]] = 1

    let randScore5 = randomNumber(emptyBoard.length, emptyBoard[0].length)

    array1.map(element => {
      if (element.toString() !== randScore1.toString()) {
        emptyBoard[element[0]][element[1]] = -2
        if (this.gameRound % 7 === 0) {
          emptyBoard[randScore5[0]][randScore5[1]] = 3
        }
      }
    })

    this.board = emptyBoard
  }
}

@Entity()
@Index(['game', 'user', 'playerNumber'], { unique: true })
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', { length: 8 })
  playerNumber: PlayerNumber
}
