import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gravatarAPI } from '../servicesAPI';
import './Header.css';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div>
        <header className="header">
          <div className="trivia-logo">
            <img src={ logo } alt="trivia logo" />
          </div>
          <div className="user-infos">
            <p data-testid="header-player-name">{ name }</p>
            <img
              alt="user avatar"
              data-testid="header-profile-picture"
              src={ gravatarAPI(gravatarEmail) }
            />
            <p data-testid="header-score">{ score }</p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
