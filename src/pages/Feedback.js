import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  ggMessage() {
    return (
      <h1>
        Mandou bem!
      </h1>
    );
  }

  bgMessage() {
    return (
      <h1>
        Podia ser melhor...
      </h1>
    );
  }

  gameFeedback(answers, score) {
    return (
      <section>
        <p data-testid="feedback-total-question">
          {`Você acertou ${answers} questões!`}
        </p>
        <p data-testid="feedback-total-score">
          {`Um total de ${score} pontos`}
        </p>
      </section>
    );
  }

  render() {
    const { gameStats: { correctAnswers, score } } = this.props;
    const numberOfAnswers = 3;
    return (
      <main>
        <header data-testid="feedback-text">
          {(correctAnswers >= numberOfAnswers) ? this.ggMessage() : this.bgMessage()}
        </header>
        {this.gameFeedback(correctAnswers, score)}
        <Link to="ranking" data-testid="btn-ranking">VER RANKING</Link>
        <Link to="/" data-testid="btn-play-again">JOGAR NOVAMENTE</Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  gameStats: state.stats,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  gameStats: PropTypes.shape({
    correctAnswers: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
