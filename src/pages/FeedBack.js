import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedHeader from '../components/FeedHeader';

class FeedBack extends React.Component {
  render() {
    const { score } = this.props;
    if (score) {
      return (
        <div>
          <FeedHeader />
          <p>FeedBack</p>
          { score.assertions < 1 + 2
            ? <div data-testid="feedback-text">Podia ser melhor...</div>
            : <div data-testid="feedback-text">Mandou bem!</div> }
          <div data-testid="feedback-total-score">{score.score}</div>
          <div
            data-testid="feedback-total-question"
          >
            {score.assertions}
          </div>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">VER RANKING</button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">JOGAR NOVAMENTE</button>
          </Link>

        </div>
      );
    }
    return (
      <div>
        <FeedHeader />
        <p>FeedBack</p>
        <p data-testid="feedback-text">Podia ser melhor...</p>
        <p data-testid="feedback-total-score">{0}</p>
        <p data-testid="feedback-total-question">{0}</p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">VER RANKING</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.login.player.user,
  email: state.login.player.email,
  score: state.game.results.player,
});

FeedBack.propTypes = {
  score: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(FeedBack);
