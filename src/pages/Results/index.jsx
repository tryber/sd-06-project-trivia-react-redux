import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

class Results extends React.Component {
  constructor(props) {
    super(props);

    const { assertions } = JSON.parse(localStorage.getItem('state')).player;

    this.state = {
      assertions,
      breakpoint: 3,
    };
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
