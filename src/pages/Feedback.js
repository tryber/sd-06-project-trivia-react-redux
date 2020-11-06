import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { avatar, name, score } = this.props;
    return (
      <div>
        <header>
          <img
            alt="Player Initials"
            data-testid="header-profile-picture"
            src={ avatar }
          />
          <h3 data-testid="header-player-name">{ name }</h3>
          <h4 data-testid="header-score">{ score }</h4>
        </header>
        <button type="button" data-testid="btn-next">Next</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatar: state.login.imageProfile,
    name: state.login.name,
    score: state.playerData.payload.score,
  };
}

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
