import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = '1' | '0'
export type PlayerNumber = 'Player 1' | 'Player 2'
export type Row = [Symbol | null, Symbol | null, Symbol | null]
export type Board = [Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [emptyRow, emptyRow, emptyRow]
const randomNumber = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyRow.length)]
const newrow = [...emptyRow]
newrow[randomNumber[1]] = '1'
console.log(newrow)
console.log(emptyBoard[randomNumber[0]])
console.log(`first: ${randomNumber[0]} and second: ${randomNumber[1]}`)
emptyBoard[randomNumber[0]] = newrow

// buttons with one point
// console.log(randomNumber)
// emptyBoard[randomNumber[0]][randomNumber[1]] = '1';



// emptyBoard[randomNumber[0]][randomNumber[1]]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { default: emptyBoard })
  board: Board

  @Column({ length: 8, default: '0' })
  playerNumber: PlayerNumber

  @Column('int', { default: '0' })
  score1: Number

  @Column('int', { default: '0' })
  score2: Number

  @Column({ length: 8, nullable: true })
  winner: PlayerNumber

  @Column('text', { default: 'pending' })
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]

  async changeBoard() {
    const randomNumber = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyRow.length)]
    const newrow = [...emptyRow]
    newrow[randomNumber[1]] = '1'
    console.log("I am rendering")
    // console.log(newrow)
    // console.log(emptyBoard[randomNumber[0]])
    // console.log(`first: ${randomNumber[0]} and second: ${randomNumber[1]}`)
    // emptyBoard[randomNumber[0]] = newrow
  }
}

@Entity()
@Index(['game', 'user', 'symbol'], { unique: true })
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
  symbol: PlayerNumber
}
