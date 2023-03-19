// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isRunning: false, timerLimit: 25}

  showPause = () => (
    <>
      <button onClick={this.stopTimer}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
          className="start-orstop"
        />
      </button>
      <p>Pause</p>
    </>
  )

  showStart = () => (
    <>
      <button onClick={this.startTimer}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
          className="start-orstop"
        />
      </button>
      <p>Start</p>
    </>
  )

  stopTimer = () => {
    clearInterval(this.interval)
    this.setState({isRunning: false})
  }

  startTimer = () => {
    this.interval = setInterval(this.timer, 1000)
    this.setState({isRunning: true, timerLimit: 25})
  }

  timer = () => {
    const {minutes, seconds, isRunning} = this.state
    if (seconds === 0 && minutes !== 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
        isRunning: true,
      }))
    } else if (seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else {
      clearInterval(this.interval)
      this.setState({isRunning: false})
    }
  }

  resetTime = () => {
    clearInterval(this.interval)
    this.setState({minutes: 25, seconds: 0, isRunning: false})
  }

  decreaseTime = () => {
    const {minutes} = this.state
    clearInterval(this.interval)

    if (minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.timerLimit - 1,
        seconds: 0,
        isRunning: false,
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  increaseTime = () => {
    const {minutes} = this.state
    clearInterval(this.interval)

    this.setState(prevState => ({
      minutes: prevState.timerLimit + 1,
      seconds: 0,
      isRunning: false,
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  render() {
    const {minutes, seconds, isRunning, timerLimit} = this.state
    const minutesNumber = minutes > 9 ? minutes : `0${minutes}`
    const secondsNumber = seconds > 9 ? seconds : `0${seconds}`

    return (
      <div className="bg-container">
        <h1>digital timer</h1>
        <p>
          {minutesNumber}:{secondsNumber}
        </p>
        {isRunning ? <p>Running</p> : <p>Paused</p>}
        <div className="controls-container">
          {isRunning ? this.showPause() : this.showStart()}
          <button onClick={this.resetTime}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              className="start-orstop"
            />
          </button>
          <p>Reset</p>
        </div>
        <p>set timer limit</p>
        <div className="timer-limit-container">
          <button onClick={this.decreaseTime}>-</button>
          <p>{timerLimit}</p>
          <button onClick={this.increaseTime}>+</button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
