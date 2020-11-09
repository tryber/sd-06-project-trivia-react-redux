import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderGame extends React.Component {
  render() {
    const { gravatarSRC, username, userScore } = this.props;
    return (
      <header>
        <img src={ gravatarSRC } data-testid="header-profile-picture" alt="Avatar" />
        <h2 data-testid="header-player-name">{ username }</h2>
        <p>
          Placar:
          <span
            data-testid="header-score"
          >
            {userScore > 0 ? userScore : 0}
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarSRC: state.gravatarReducer.gravatar,
  username: state.loginReducer.name,
  userScore: state.scoreReducer.userScore.score,
});

HeaderGame.propTypes = {
  gravatarSRC: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userScore: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderGame);
