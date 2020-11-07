import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();

  //   this.updateScore = this.updateScore.bind(this);

  //   this.state = {
  //     score: 0,
  //   };
  // }

  // async updateScore() {
  //   const state = await JSON.parse(localStorage.getItem('state'));
  //   console.log(state);
  //   this.setState({ score: state.player.score });
  // }

  render() {
    const { email, name, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Avatar"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  name: state.userReducer.name,
  score: state.userReducer.score,
});

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
