import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    const { playerName, email } = this.props;
    const hash = md5(email);
    console.log(hash);

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/${hash}` }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <div data-testid="header-player-name">{playerName}</div>
        <div data-testid="header-score"> 0</div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.login.player.user,
  email: state.login.player.email,
});

FeedHeader.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(FeedHeader);
