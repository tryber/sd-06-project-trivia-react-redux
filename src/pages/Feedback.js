import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import ScoreFeedback from '../components/ScoreFeedback';

class Feedback extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.rankingRedirect = this.rankingRedirect.bind(this);
  }

  componentDidMount() {
    const { userName, userScore, userGravatar } = this.props;
    const userInfo = {
      name: userName,
      score: userScore,
      picture: userGravatar,
    };

    let value = [];
    value = JSON.parse(localStorage.getItem('ranking')) || [];
    value.push(userInfo);
    value.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(value));
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

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userScore: state.scoreReducer.userScore.score,
  userGravatar: state.gravatarReducer.gravatar,
});

export default connect(mapStateToProps)(Feedback);
