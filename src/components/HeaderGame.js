import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderGame extends React.Component {
  render() {
    const { gravatarSRC, username } = this.props;
    return (
      <header>
        <img src={ gravatarSRC } data-testid="header-profile-picture" alt="Avatar" />
        <h2 data-testid="header-player-name">{ username }</h2>
        <p>
          Placar:
          <span
            data-testid="header-score"
          >
            0
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarSRC: state.gravatarReducer.gravatar,
  username: state.loginReducer.name,
});

HeaderGame.propTypes = {
  gravatarSRC: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderGame);
