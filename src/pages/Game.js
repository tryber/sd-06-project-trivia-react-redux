import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import store from '../store';
import Timer from '../components/timer';

class Game extends Component {
  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.response.token);
  }

  render() {
    const { info } = this.props;
    console.log(info.response.token);
    return (
      <Provider store={ store }>
        <Header />
        <Timer />
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.tokenReduce,
});

Game.propTypes = {
  info: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Game);
