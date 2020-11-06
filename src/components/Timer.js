import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderTime } from '../actions';
import { connect } from 'react-redux';

class Timer extends Component {
  componentDidMount() {
    const oneSec = 1000;
    const { timeController } = this.props;
    setInterval(() => timeController(), oneSec);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
      Tempo:
        { timer }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timeController: () => dispatch(renderTime()),
});

Timer.propTypes = {
  timeController: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
