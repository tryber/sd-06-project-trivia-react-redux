import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const { nome, pontos, index } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <p data-testid={ `player-name-${index}` }>
          { nome }
        </p>
        <p data-testid={ `player-score-${index}` }>
          { pontos }
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.name,
  index: state.user.index,
  pontos: state.user.score,
});

export default connect(mapStateToProps)(Ranking);
