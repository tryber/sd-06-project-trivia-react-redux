import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../Css/Header.css';

class Header extends React.Component {
  render() {
    const { hash, player: { name, gravatarEmail, score } } = this.props;

    return (
      <div className="header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ `${name} profile` }
          className="header-gravatar"
        />
        <span data-testid="header-player-name" className="header-name">
          { `${name} | ${gravatarEmail}` }
        </span>
        <span data-testid="header-score" className="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.reducerLogin.player,
  hash: state.reducerLogin.hash,
});

Header.propTypes = {
  hash: PropTypes.string,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

Header.defaultProps = {
  hash: '',
};

export default connect(mapStateToProps)(Header);
