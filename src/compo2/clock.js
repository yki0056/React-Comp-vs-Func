import React, { Component } from 'react';

class ClockUsingClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            comet: 'meteor'
        }
    }
    changeTime() {
        this.setState({ date: new Date() })
    }
    componentDidMount() {
        setInterval(() => {
            this.changeTime()
        }, 1000)
    }

    render() {
        return (
            <div className="clock">
                <h1>Hello! This is a class component clock.</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <h2>It is {this.state.comet}.</h2>
            </div>
        )
    }
}

export default ClockUsingClass;