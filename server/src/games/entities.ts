import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne/* , CreateDateColumn, UpdateDateColumn */ } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type PlayerNumber = 'P1' | 'P2'
// export type Row = [Symbol | null, Symbol | null, Symbol | null]
// export type Board = [Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

// const emptyRow = [null, null, null]
// const emptyBoard = [emptyRow, emptyRow, emptyRow]
// const randomNumber = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyRow.length)]
// const newrow = [...emptyRow]
// newrow[randomNumber[1]] = '1'
// console.log(newrow)
// console.log(emptyBoard[randomNumber[0]])
// console.log(`first: ${randomNumber[0]} and second: ${randomNumber[1]}`)
// emptyBoard[randomNumber[0]] = newrow

// buttons with one point
// console.log(randomNumber)
// emptyBoard[randomNumber[0]][randomNumber[1]] = '1';



// emptyBoard[randomNumber[0]][randomNumber[1]]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { nullable: true })
  board: Number[][]

  @Column({ length: 8, default: 'P1' })
  clickedBy: PlayerNumber

  // @Column()
  // @CreateDateColumn({ type: "timestamp", precision: 6 })
  // createdAt: Date;
  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: number;

  // @Column()
  // @UpdateDateColumn({ type: "timestamp", precision: 6 })
  // updatedAt: Date;

  @Column('int', { default: '0' })
  score1: number

  @Column('int', { default: '0' })
  score2: number

  @Column({ length: 8, nullable: true })
  winner: string

  @Column('text', { default: 'pending' })
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]

  async changeBoard() {
    const emptyBoard = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
    let randScore = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyBoard[0].length)]
    let randBomb = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyBoard[0].length)]
    while (randBomb.toString() === randScore.toString()) {
      // console.log("inside while")
      randBomb = [Math.floor(Math.random() * emptyBoard.length), Math.floor(Math.random() * emptyBoard[0].length)]
    }
    // console.log(`second time score ${randScore} and bomb ${randBomb}`)
    emptyBoard[randScore[0]][randScore[1]] = 1
    emptyBoard[randBomb[0]][randBomb[1]] = -1// const newrow = [...emptyRow]
    // newrow[randomNumber[1]] = '1'
    // console.log("I am rendering")
    // console.log("changeBoard is trigerred")
    // emptyBoard[randomNumber[0]][randomNumber[1]] = 1
    this.board = emptyBoard
    // console.log(emptyBoard)
    // console.log(newrow)
    // console.log(emptyBoard[randomNumber[0]])
    // console.log(`first: ${randomNumber[0]} and second: ${randomNumber[1]}`)
    // emptyBoard[randomNumber[0]] = newrow
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
