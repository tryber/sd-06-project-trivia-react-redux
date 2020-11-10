import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TopRanking from './components/TopRanking';

class Ranking extends Component {
  render() {
    const { arrayRanking } = this.props;
    const arrayOrganizado = [...arrayRanking].sort((obj1, obj2) => obj2.score - obj1.score);
    const arrayOrganizado5Itens = arrayOrganizado.slice(0, 5);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { arrayOrganizado5Itens
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
        </ul>
        <Link to="/">
          <button
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

export default connect(mapStateToProps)(Ranking);





// array.sort(function(5, 6){

//   return a > b;

// });