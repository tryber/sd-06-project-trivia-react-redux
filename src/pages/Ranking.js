import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopRanking from './components/TopRanking';
import '../style/Ranking.css';

class Ranking extends Component {
  render() {
    const { arrayRanking } = this.props;
    const arrayOrganized = [...arrayRanking]
      .sort((obj1, obj2) => obj2.score - obj1.score);
    const topFive = 5;
    const arrayOrganized5Itens = arrayOrganized.slice(0, topFive);
    return (
      <div className="ranking">
        <h1 className="text-title" data-testid="ranking-title">Ranking</h1>
        <div className="list">
          { arrayOrganized5Itens
            .map(({
              name,
              picture,
              score,
            }, index) => (<TopRanking
              name={ name }
              picture={ picture }
              score={ score }
              index={ index }
              key={ index }
            />)) }
        </div>
        <Link to="/">
          <button
            className="bttn"
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para Início
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayRanking: state.questionsInformation.ranking,
});

Ranking.propTypes = {
  arrayRanking: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default connect(mapStateToProps)(Ranking);
