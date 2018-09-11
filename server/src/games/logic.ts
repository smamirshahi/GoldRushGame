import { PlayerNumber } from './entities'

// the winner is the one who has higher score
export const calculateWinner = (score1: number, score2: number): PlayerNumber | string => {
  if (score1 > score2) {
    return 'P1'
  } else if (score1 < score2) {
    return 'P2'
  } else {
    return 'tie'
  }
}