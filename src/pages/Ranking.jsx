import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { ranking } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          .sort((a, b) => b.score - a.score)
          .map((eachRanking, index) => (
            <div key={ index }>
              <img src={ eachRanking.picture } alt="esquilo" />
              <p data-testid={ `player-name-${index}` }>{eachRanking.name}</p>
              <p data-testid={ `player-score-${index}` }>{eachRanking.score}</p>
            </div>
          ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
