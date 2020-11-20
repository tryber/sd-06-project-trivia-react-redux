import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import Header from '../../components/Header';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.handleRankingUpdate = this.handleRankingUpdate.bind(this);

    const userScore = JSON.parse(localStorage.getItem('state')).player;

    this.state = {
      assertions: userScore.assertions,
      breakpoint: 3,
      userScore,
    };
  }

  componentDidMount() {
    this.handleRankingUpdate();
  }

  handleRankingUpdate() {
    const { userScore: { name, score, gravatarEmail } } = this.state;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    const hashedEmail = md5(gravatarEmail);
    const picture = `https://www.gravatar.com/avatar/${hashedEmail}`;

    ranking.push({ name, score, picture });

    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { assertions, breakpoint } = this.state;
    const { score } = this.props;

    return (
      <div className="results-page">
        <Header />
        <div className="results-body">
          <p data-testid="feedback-text">
            { (assertions < breakpoint)
              ? ('Podia ser melhor... ')
              : ('Mandou bem!')}
          </p>
          <p>
            Seu Score:
            <span data-testid="feedback-total-score">
              { score }
            </span>
          </p>
          <p>
            Você acertou:
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
          </p>
          <Link to="/" data-testid="btn-play-again">
              Jogar novamente
          </Link>
          <Link to="/ranking" data-testid="btn-ranking">
              Ver Ranking
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.user.score,
  };
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Results);
