import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from './Questions';

class GameHeader extends React.Component {
  render() {
    const { name, email } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          // gravatar
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="gravatar-profile-pic"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <p data-testid="header-score">0</p>
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(GameHeader);

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
