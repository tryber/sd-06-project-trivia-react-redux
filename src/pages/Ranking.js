import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopRanking from './components/TopRanking';

class Ranking extends Component {
  render() {
    const { arrayRanking } = this.props;
    const arrayOrganizado = [...arrayRanking].sort((obj1, obj2) => obj2.score - obj1.score);
    return (
      <div>
        <h1>Ranking</h1>
        <ul>
          { arrayOrganizado
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