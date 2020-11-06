import React from 'react';
import { connect } from 'react-redux';
import { saveTimeLeft } from '../redux/actions';

class Timer extends React.Component {
  
  componentDidMount() {
    const { saveTime } = this.props;
    const startSeconds = 30;
    let seconds = startSeconds;
    const interval = 1000;
    if (seconds > 1) {
      this.myInterval = setInterval(() => {
        if (seconds > 0) seconds -= 1;
        // console.log(seconds);
        // aqui deveria salvar os segundos que faltam
        saveTime(seconds);
      }, interval);
    }

    if (seconds === 0) {
      // console.log(seconds)
      clearInterval(this.myInterval);
    }
  }

  render() {
    const { seconds } = this.props;
    return (
      <div>
        <span>{seconds}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.timer.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  saveTime: (seconds) => dispatch(saveTimeLeft(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
