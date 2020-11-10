import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  componentDidMount() {
    const { name, email, score } = this.props;
    const player = { name, email, score };
    console.log(localStorage.ranking);
    const players = JSON.parse(localStorage.ranking || '[]').concat(player);
    console.log(players);
    window.localStorage.setItem('ranking', JSON.stringify(players));
  }

  choiceOfMessage() {
    // const { placar } = this.props;
    const player = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    if (player.player.assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    // const { acertos, placar } = this.props;
    const player = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <h3>
          Placar:
          <span data-testid="feedback-total-score">{ player.player.score }</span>
        </h3>
        <h3>
          Você acertou:
          <span data-testid="feedback-total-question">{ player.player.assertions }</span>
        </h3>
        <h3 data-testid="feedback-text">
          { this.choiceOfMessage() }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
});

FeedbackMessage.propTypes = {
  score: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(FeedbackMessage);
