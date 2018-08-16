import React from 'react'
import './Board2.css'
// import {score, bomb} from '../../actions/games'


const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, classname) => {
  if (symbol === 1) {classname = "point"}
  else if (symbol === -2){classname = "bomb"}
  else if (symbol === 5){classname = "bonus5"}
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
    ></button>
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)

