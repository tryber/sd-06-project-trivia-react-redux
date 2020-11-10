import React from 'react';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import ScoreFeedback from '../components/ScoreFeedback';

class Feedback extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.rankingRedirect = this.rankingRedirect.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  rankingRedirect() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <section>
        <HeaderGame />
        <ScoreFeedback />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.rankingRedirect }
        >
          Ver Ranking
        </button>
      </section>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Feedback;
