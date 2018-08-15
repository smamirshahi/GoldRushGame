import React from 'react'
import './Board.css'
import {score, bomb} from '../../actions/games'


const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, classname) => {
  if (symbol === 1) {classname = "point"}
  else if (symbol === -1){classname = "bomb"}
  else classname = "none"

  // makeMove = (value) =>{
  //   console.log(value)
  //   if (value === 0)return
  //   else if (value === 1){score()}
  //   else if (value === -1){bomb()}
  // }

  return (
    <button
    class={classname}
    className={classname}
    value={symbol}
      // disabled={hasTurn}
      onClick={() => makeMove(symbol)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)

