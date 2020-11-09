import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, score, timer } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imgProfile"
        />
        <p data-testid="header-player-name">
          Name:
          {name}
        </p>
        <p>
          Timer:
          {timer}
        </p>
        <span data-testid="header-score">
          Score:
          {score}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.user.score,
});

Header.propTypes = {
  dispatchScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
