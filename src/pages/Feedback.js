import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';
import '../style/Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { count: { assertions } } = this.props;
    const lessThanThree = 'Podia ser melhor...';
    const moreThanThree = 'Mandou bem!';
    const three = 3;
    if (assertions < three) {
      return lessThanThree;
    }
    return moreThanThree;
  }

  render() {
    const { count: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
        <div className="feedback">
          <h3 className="text-title" data-testid="feedback-text">
            {this.feedbackMessage()}
          </h3>
          <span className="text">Score:</span>
          <span className="text" data-testid="feedback-total-score">{score}</span>
          <span className="text">Total de questões acertadas:</span>
          <span className="text" data-testid="feedback-total-question">
            {assertions}
          </span>
          <Link to="/">
            <button
              className="bttn-login"
              type="button"
              data-testid="btn-play-again"
            >
              Jogar Novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="bttn-ranking"
              type="button"
              data-testid="btn-ranking"
            >
              Ver Raking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.user.player,
});
Feedback.propTypes = {
  count: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
