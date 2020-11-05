import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hash = md5(email);
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p>
          Placar:
          <span data-testid="header-score">{ score }</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.game.name,
  email: state.game.gravatarEmail,
  score: state.game.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
