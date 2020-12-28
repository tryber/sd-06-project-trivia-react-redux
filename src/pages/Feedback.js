import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addPlayerRankingAction } from '../actions';
import { MenuResponsive, ProfileBarResponsive } from '../components';
import './Feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    const { player, ranking, addPlayerRanking,
      history, authenticationStatus } = this.props;
    const { name, gravatarEmail } = player;
    if (!authenticationStatus) history.push('/');
    const alreadyInRanking = ranking.filter((p) => (p.name === name
      && p.gravatarEmail === gravatarEmail));
    if (alreadyInRanking.length === 0) addPlayerRanking(player);
  }

  render() {
    const feedback = {
      ltThree: 'Podia ser melhor...',
      geThree: 'Mandou bem!',
    };
    const { score, assertions } = this.props;
    const threeCorrectAnswers = 3;

    return (
      <div>
        <MenuResponsive />
        <ProfileBarResponsive />
        <div className="feedback-container">
          <p data-testid="feedback-text">
            { assertions >= threeCorrectAnswers ? feedback.geThree : feedback.ltThree }
          </p>
          <div className="results-container">
            <div className="results-header">
              <p>RESULTS</p>
            </div>
            <div className="results-score">
              <p>SCORE</p>
              <p data-testid="feedback-total-score" className="score">{score}</p>
            </div>
            <div className="results-score">
              <p>ASSERTIONS</p>
              <p data-testid="feedback-total-question" className="score">{assertions}</p>
            </div>
            <div className="replay-button-area">
              <Link to="/">
                <button
                  className="replay-button"
                  type="button"
                  data-testid="btn-play-again"
                >
                  Play Again
                </button>
              </Link>
              <Link to="/ranking">
                <button
                  className="ranking-button"
                  type="button"
                  data-testid="btn-ranking"
                >
                  See Ranking
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
  player: state.player,
  score: state.player.score,
  assertions: state.player.assertions,
  authenticationStatus: state.authenticationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  addPlayerRanking: (e) => dispatch(addPlayerRankingAction(e)),
});

Feedback.propTypes = {
  addPlayerRanking: PropTypes.func.isRequired,
  ranking: PropTypes.arrayOf(PropTypes.shape).isRequired,
  player: PropTypes.shape.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
