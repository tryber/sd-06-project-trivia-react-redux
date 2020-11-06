import React, { Component } from 'react';
import { renderTime } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    const { timeController } = this.props;
    setInterval(() => timeController(), 1000)
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
