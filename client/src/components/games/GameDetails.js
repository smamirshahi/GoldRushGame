import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'
import { score, bomb } from '../../actions/games'
import Clock from './Clock'


class GameDetails extends PureComponent {
  state = {}

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
    // const futureTime = new Date().getTime() /1000 + 30;

    // this.state =  setInterval(function(){
    //   let now = new Date().getTime() /1000
    //   let difference = Math.floor(now - futureTime)
    //     if (difference ===0){clearInterval(x)}
    //     return  { time: difference }
    //     // console.log(difference)

    //   }, 1000)

  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  // makeMove = (toRow, toCell) => {
  //   const {game, updateGame} = this.props

  //   const board = game.board.map(
  //     (row, rowIndex) => row.map((cell, cellIndex) => {
  //       if (rowIndex === toRow && cellIndex === toCell) return game.turn
  //       else return cell
  //     })
  //   )
  //   updateGame(game.id, board)
  // }


  makeMove = (value) => {
    const gameId = this.props.game.id
    // console.log(value)
    if (value === 0) return
    else { this.props.score(gameId, value) }
    // else if (value === -1){this.props.bomb(gameId, value)}
  }

  render() {

    const { game, users, authenticated, userId } = this.props


    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'
    let p1Class
    let p2Class
    if ((game.score1 > game.score2)) {
      p1Class = "higher_score"
      p2Class = "lower_score"
    } else if (game.score1 < game.score2) {
      p1Class = "lower_score"
      p2Class = "higher_score"
    } else {
      p1Class = "equal_score"
      p2Class = "equal_score"
    }


    // const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]


    return (<Paper className="outer-paper">
      <div className='topper'>
      </div>
      <p className="status">Status: {game.status}</p>

      
  
      <div className="flex-container">
      <div>
       <p className={p1Class.concat(" flex-item")}> Player1:<br />{game.score1}</p>
       </div>
      <div className="countdown">
      <p>Time: <br></br></p>
      <div className="countdownClock">
       {game.status === 'started' && <Clock />}
       </div>
      </div>
       <p className={p2Class.concat(" flex-item")}>Player2:<br />{game.score2}</p>
       </div >
      {/* {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      } */}

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} makeMove={this.makeMove} />
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, score, bomb
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)