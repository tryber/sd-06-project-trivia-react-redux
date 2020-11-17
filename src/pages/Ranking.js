import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <div className="container-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="list">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={ index }>
                <img src={ player.picture } alt={ player.name } />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>
            ))}
        </div>
        <div className="button-ranking">
          <Link to="/">
            <button type="button" data-testid="btn-go-home">JOGAR NOVAMENTE</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Ranking);
