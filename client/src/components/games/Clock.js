import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './Clock.css'

class Clock extends PureComponent {
    state = {}

    componentDidMount = () => {
        // const status = this.props.game.status    
        const futureTime = Date.now() / 100 + 30*10;
        const x = setInterval(() => {
            let now = Date.now() / 100
            let difference = (Math.floor(futureTime - now) / 10).toFixed(1)
            difference <= 0 && clearInterval(x)
            difference <= 0 && console.log("gameover")
            // console.log(this)
            this.setState(
                { time: difference }
            )
        }, 100)
    }


    render() {
        let time = this.state.time
        if (Math.floor(time % 10) === 0 || Math.floor(time % 10) === 1 || Math.floor(time % 10) === 9 ) {
            this.clock_class = "bold_class"
        } else {
            this.clock_class = "normal_class"
        }
        if (time >= 20) this.clock_class = "small_clock".concat(" general_clock")
        else if (time >= 10) this.clock_class = "normal_clock".concat(" general_clock")
        else if (time >= 5) this.clock_class = "large_clock".concat(" general_clock", " blink_me")
        else this.clock_class = "super_clock".concat(" general_clock", " blink_me")

        return (
             <div className = {this.clock_class}>
               {this.state.time}
            </div>
        )
    }
}

export default connect()(Clock)