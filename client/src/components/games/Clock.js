import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class Clock extends PureComponent{
    state = {}

    componentDidMount=()=>{
        // const status = this.props.game.status
    
        const futureTime = new Date().getTime() /1000 + 10;
         const x = setInterval(()=>{
            let now = new Date().getTime() /1000
            let difference = Math.floor(now - futureTime)
              difference ===0 && clearInterval(x) 
              difference ===0 && console.log("gameover")
              // console.log(this)
              this.setState(
               { time: difference }
              )  
            }, 1000)
    }
      

    render(){
        return(
        <div>
        {this.state.time}
        </div>
        )
    }
}

export default connect ()(Clock)