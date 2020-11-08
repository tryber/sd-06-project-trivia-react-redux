import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../Css/Header.css';

class Header extends React.Component {
  render() {
    const { name, hash, score } = this.props;

    return (
      <div className="header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ `${name} profile` }
          className="header-gravatar"
        />
        <span data-testid="header-player-name" className="header-name">{ name }</span>
        <span data-testid="header-score" className="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerLogin.name,
  hash: state.reducerLogin.hash,
  score: state.reducerLogin.score,
});

export default connect(
  mapStateToProps,
)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
