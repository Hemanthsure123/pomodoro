import './index.css'
import { Component } from 'react'
import timer from '../../assets/mytimer.mp3'
import ReactAudioPlayer from 'react-audio-player';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'



class DigitalTimer extends Component {
    state = { minutes: 25, seconds: 0, isTimerRunning: false }

    componentWillUnmount() {
        this.clearTimerInterval()
    }

    clearTimerInterval = () => {
        clearInterval(this.intervalId)
    }

    onDecrementTime = () => {
        const { minutes } = this.state
        if (minutes > 1) {
            this.setState(prevState => ({ minutes: prevState.minutes - 1 }))
        }
    }
    onIncrementTime = () => {
        this.setState(prevState => ({ minutes: prevState.minutes + 1 }))
    }

    onResetTime = () => {
        this.clearTimerInterval()
        this.setState({ minutes: 25, seconds: 0, isTimerRunning: false })
    }

    increaseTime = () => {
        const { minutes, seconds } = this.state
        const isTimerCompleted = minutes * 60 === seconds
        if (isTimerCompleted) {
            this.clearTimerInterval()
            this.setState({ isTimerRunning: false })
        } else {
            this.setState(prevState => ({ seconds: prevState.seconds + 1 }))
        }
    }

    onStartStop = () => {
        const { minutes, seconds, isTimerRunning } = this.state
        const isTimerCompleted = minutes * 60 === seconds
        if (isTimerCompleted) {
            this.setState({ seconds: 0 })
        }
        if (isTimerRunning) {
            this.clearTimerInterval()
        } else {
            this.intervalId = setInterval(this.increaseTime, 1000)
        }
        this.setState(prevState => ({
            isTimerRunning: !prevState.isTimerRunning,
        }))
    }

    onChangeMinutes = event => {
        const x = event.target.value
        if (x > 0) {
            this.setState({ minutes: event.target.value })
        }
    }

    getClearTimer = () => {
        const { minutes, seconds } = this.state
        const remainingSeconds = minutes * 60 - seconds
        const getMinutes = Math.floor(remainingSeconds / 60)
        const getSeconds = Math.floor(remainingSeconds % 60)
        const stringifiedMinutes = getMinutes > 9 ? getMinutes : `0${getMinutes}`
        const stringifiedSeconds = getSeconds > 9 ? getSeconds : `0${getSeconds}`
        return `${stringifiedMinutes}:${stringifiedSeconds}`
    }

    render() {
        const { minutes, seconds, isTimerRunning } = this.state
        const isButtonDisabled = seconds > 0
        const isPlaying = isTimerRunning
        return ( <
            div className = "main-container" >
            <
            h1 className = "main-heading" > DIGITAL TIMER < /h1> {
                minutes * 60 === seconds ? ( <
                    div >
                    <
                    p className = "timer-completed" > Timer completed < /p> <
                    ReactAudioPlayer src = { timer }
                    autoPlay / >
                    <
                    /div>

                ) : (
                    ''
                )
            } <
            div className = "body-container" >
            <
            div className = "display-time-container" >
            <
            div className = 'circle-counter' >
            <
            CountdownCircleTimer isPlaying = { isPlaying }
            duration = { minutes * 60 }
            colors = {
                ['#004777', '#F7B801', '#A30000', '#A30000'] }
            colorsTime = {
                [minutes * 60 / 7, minutes * 60 / 5, minutes * 60 / 2, 0] }
            onComplete = {
                () => ({ shouldRepeat: true, delay: 1 }) }
            updateInterval = { 1 } > {
                ({ remainingTime }) => ( <
                    h1 > { remainingTime } < /h1>
                )
            } <
            /CountdownCircleTimer> <
            /div> <
            div className = 'main-counter' >
            <
            h1 className = "time" > { this.getClearTimer() } <
            span > {
                isTimerRunning ? ( <
                    p className = "timer-status" > Runnig < /p>
                ) : ( <
                    p className = "timer-status" > Paused < /p>
                )
            } <
            /span> <
            /h1> <
            /div> <
            /div> <
            div className = "timer-controls-container" >
            <
            div className = "all-timer-controls" > {!isTimerRunning ? ( <
                    div className = "start-control" >
                    <
                    img src = "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt = "play icon"
                    className = "start-icon"
                    onClick = { this.onStartStop }
                    /> <
                    p className = "start-text" > Start < /p> <
                    /div>
                ) : ( <
                    div className = "start-control" >
                    <
                    img src = "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt = "pause icon"
                    className = "start-icon"
                    onClick = { this.onStartStop }
                    /> <
                    p className = "start-text" > Stop < /p> <
                    /div>
                )
            } <
            div className = "start-control" >
            <
            img src = "https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt = "reset-icon"
            className = "start-icon"
            onClick = { this.onResetTime }
            /> <
            p className = "start-text" > Reset < /p> <
            /div> <
            /div> <
            div className = "increment-decrement-container" >
            <
            button className = "decrement-sign"
            type = "button"
            disabled = { isButtonDisabled }
            onClick = { this.onDecrementTime } >
            -
            <
            /button> <
            input type = "text"
            className = "timer-text"
            value = { minutes }
            onChange = { this.onChangeMinutes }
            /> <
            button className = "decrement-sign"
            type = "button"
            disabled = { isButtonDisabled }
            onClick = { this.onIncrementTime } >
            +
            <
            /button> <
            /div> <
            /div> <
            /div> <
            /div>
        )
    }
}

export default DigitalTimer