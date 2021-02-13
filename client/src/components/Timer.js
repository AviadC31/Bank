import React, { Component } from 'react'

class Timer extends Component {

    constructor() {
        super()
        this.state = {
            time: new Date(),
            ampm: ''
        }
    }

    componentDidMount() {
        let date = new Date()
        let hours = date.getHours()
        let ampm = hours >= 12 ? 'PM' : 'AM';
        this.timer = setInterval(() => {
            this.setState({ time: new Date(), ampm })
            console.log("Updated time")
        }, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    render() {
        return <div> {this.state.time.toLocaleTimeString()}{" " + this.state.ampm}</div>
    }
}

export default Timer