import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJs from 'crypto-js';
import PropTypes from 'prop-types';
import { resetScore } from '../actions';

class Header extends Component {
  // componentDidMount() {
  //   const { name, score, gravatarEmail, assertions } = this.props;
  //   const state = JSON.parse(localStorage.getItem('ranking'));
  //   const player = {
  //     player: {
  //       name,
  //       assertions,
  //       score,
  //       gravatarEmail,
  //     },
  //   };
  //   if (state) return localStorage.setItem('ranking', JSON.stringify([...state, player]));
  //   return localStorage.setItem('ranking', JSON.stringify([player]));
  // }
  componentDidMount() {
    const { scoreReset } = this.props;
    scoreReset();
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = CryptoJs.MD5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name" name="">
          { name }
        </span>
        <span data-testid="header-score" name="">
          { score }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  gravatarEmail: state.userReducer.email,
  score: state.userReducer.player.score,
  // assertions: state.userReducer.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  scoreReset: () => dispatch(resetScore()),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  scoreReset: PropTypes.func.isRequired,
  // assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
