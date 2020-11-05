import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class TriviaGame extends Component {
  render() {
    const { userName, userImage } = this.props;
    return (
      <div>
        <h1>JOGAR</h1>
        <img
          alt="user login"
          data-testid="header-profile-picture"
          src={ userImage }
        />
        <h3
          data-testid="header-player-name"
        >
          { userName }
        </h3>
        <h3
          data-testid="header-score"
        >
          0
        </h3>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.nome,
  userImage: state.loginReducer.image,
});

TriviaGame.propTypes = {
  userName: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(TriviaGame);
