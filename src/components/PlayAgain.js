import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { scoreAction } from '../actions';

class PlayAgain extends React.Component {
  constructor() {
    super();

    this.resetScore = this.resetScore.bind(this);

  }

  resetScore() {
    const { scoreReset } = this.props;
    const ranked = {
      name: '',
      score: 0,
      avatar: '',
      assertions: 0,
    }
    scoreReset(ranked);
  }
  render() {
    return (
      <Link to="/">
        <button
          className="btn-play-again"
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.resetScore() }
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  scoreReset: (score) => dispatch(scoreAction(score)),
});

export default connect(null, mapDispatchToProps)(PlayAgain);
