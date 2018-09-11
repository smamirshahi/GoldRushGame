import {ADD_GAME, UPDATE_GAME, UPDATE_GAMES, SCORE} from '../actions/games'
import {USER_LOGOUT} from '../actions/users'

export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
    
    case ADD_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAMES:
      return payload.reduce((games, game) => {
        games[game.id] = game
        return games
      }, {})
    
    case SCORE:
    console.log(payload)
      return {
        ...state,
        [payload.id]: payload
      }

    default:
      return state
  }
}
