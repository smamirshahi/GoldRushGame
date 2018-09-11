import React, { PureComponent } from 'react'

export default class Introduction extends PureComponent {
  render() {
    return (<div>

      <p id={"introductionDescription"}>Rush for the Gold! But be aware of the dynamite!</p>

      <div className="flex-container2">
        <div className="flex-item2">
          <img src={require("../../images/brickgold.png")} alt="coin"></img>
          <section>1 point</section>
        </div>
        <div className="flex-item2">
          <img src={require("../../images/brickdiamond2.png")} alt="diamond"></img>
          <section>3 points</section>
        </div>
        <div className="flex-item2">
          <img src={require("../../images/brickbomb.png")} alt="bomb"></img>
          <section>-2 points</section>
        </div>
      </div>
      <img src={require("../../images/board2.png")} alt="board" className={"mainBoard"}></img>

    </div>
    )
  }
}
