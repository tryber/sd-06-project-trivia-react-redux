import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedHeader from '../components/FeedHeader';
import { addResult } from '../actions/game';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.clearResult = this.clearResult.bind(this);
  }

  clearResult() {
    const { dispatchResult } = this.props;
    dispatchResult({ player: { score: 0, assertions: 0, name: '', gravatarEmail: '' } });
  }

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
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.clearResult() }
            >
VER RANKING
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => this.clearResult() }
            >
JOGAR NOVAMENTE
            </button>
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
  score: state.game.results.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResult: (result) => dispatch(addResult(result)),
});

FeedBack.propTypes = {
  score: PropTypes.shape().isRequired,
  dispatchResult: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
