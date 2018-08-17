import React, { PureComponent } from 'react'

export default class Introduction extends PureComponent {
  render() {
    return (<div>
      <p id={"introductionTitle"}> Introduction </p>
      <img src={require("../../images/board2.png")} alt="board" className={"mainBoard"}></img>
      <div className="flex-container2">
        <div className="flex-item2">
          <img src={require("../../images/brickgold.png")} alt="coin"></img>
          <section>This has 1 point</section>
        </div>
        <div className="flex-item2">
          <img src={require("../../images/brickdiamond2.png")} alt="diamond"></img>
          <section>This has 3 point</section>
        </div>
        <div className="flex-item2">
          <img src={require("../../images/brickbomb.png")} alt="bomb"></img>
          <section>This has -1 point</section>
        </div>
      </div>
      <div>
        <p id={"introductionDescription"}>Click faster than your opponent. The cells randomly change after each click</p>
      </div>
    </div>
    )}
}


















