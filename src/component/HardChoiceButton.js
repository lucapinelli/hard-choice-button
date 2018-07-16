import React, { Component } from 'react';
import { Action, withStatechart } from 'react-automata';

const statechart = {
  initial: 'ready',
  states: {
    ready: {
      on: {
        GO: { 'pending': { actions: ['startCountdown'] } }
      },
      onEntry: 'sayReady',
    },
    pending: {
      onEntry: 'sayClickToAbort',
      on: {
        STOP: { 'aborted': { actions: ['stopCountdown'] } },
        BOOM: 'boom',
      },
    },
    aborted: {
      on: {
        NEXT: 'ready',
      },
      onEntry: 'sayAborted',
    },
    boom: {
      onEntry: 'sayBoom',
    },
  },
}

class HardChoiceButton extends Component {

  interval
  state = {
      countdown: 5
  }

  componentWillUnmount() {
      this.stopCountdown()
  }

  startCountdown() {
      this.setState({ countdown: 5 })
      this.interval = setInterval(() => {
          if (this.state.countdown === 1) {
              this.boom();
          } else {
              this.setState({ countdown: this.state.countdown - 1 })
          }
      }, 1000);
  }

  stopCountdown() {
      clearInterval(this.interval);
  }

  boom() {
      this.stopCountdown();
      alert('kaboom!');
      this.props.transition('BOOM');
  }

  handleClick = () => {
      const currentState = this.props.machineState.value;
      const action = {
          ready: 'GO',
          pending: 'STOP',
          aborted: 'NEXT'
      }[currentState]
      this.props.transition(action)
  }

  render() {
    const disabled = this.props.machineState.value === 'boom'
    return (
      <div>
        <button disabled={disabled} onClick={this.handleClick}>
            <Action show="sayReady">Launch Missiles</Action>
            <Action show="sayClickToAbort">Action will automatically take place in {this.state.countdown} seconds. Click to abort.</Action>
            <Action show="sayAborted">{this.state.countdown > 1 ? 'Aborted. Return?' : 'Wow, that was close! Return?'}</Action>
            <Action show="sayBoom">Done.</Action>
        </button>
      </div>
    );
  }
}

export default withStatechart(statechart)(HardChoiceButton);
