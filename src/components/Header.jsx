import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    const { hash, name, score } = this.props;
    return (
      <header className="app-header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto perfil"
        />
        <span data-testid="header-player-name">
          { name }
        </span>
        <span className="header-score" data-testid="header-score">
          {score}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.token.hash,
  name: state.user.name,
  score: state.game.score,
});

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
