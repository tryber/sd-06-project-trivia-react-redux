import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.response.token);
  }

  render() {
    const { info } = this.props;
    console.log(info.response.token);
    return (<div>Game</div>);
  }
}

const mapStateToProps = (state) => ({
  info: state.tokenReduce,
});

Game.propTypes = {
  info: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Game);
