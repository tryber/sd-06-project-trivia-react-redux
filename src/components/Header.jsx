import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { userInfo } from '../actions';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
            alt="avatar"
          />
        </div>
        <div>
          <h3>Nome:</h3>
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div>
          <h3>Placar:</h3>
          <span data-testid="header-score">{ score }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.state.player.name,
  email: state.state.player.gravatarEmail,
  score: state.state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
