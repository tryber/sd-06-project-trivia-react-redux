import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    console.log(email, name);
    console.log(this.props);
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Avatar"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">0</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  name: state.userReducer.name,
});

Header.propTypes = {
  email: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Header);
