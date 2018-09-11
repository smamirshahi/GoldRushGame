import React from 'react'
import './Board2.css'


const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, classname) => {
  if (symbol === 1) { classname = "point" }
  else if (symbol === -2) { classname = "bomb" }
  else if (symbol === 3) { classname = "bonus3" }
  else classname = "none"

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
export default ({ board, makeMove }) => board.map((cells, rowIndex) =>
  <div key={rowIndex} className="row">
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex, symbol, false))}
  </div>
)



