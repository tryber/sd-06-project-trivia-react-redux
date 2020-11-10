import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      scorePlayers: [],
    };
    this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this);
  }

  componentDidMount() {
    const { loadFromLocalStorage } = this;
    loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const { name, email, score } = this.props;
    const actualPlayer = { name, email, score };
    if (!localStorage.getItem('scorePlayers')) {
      localStorage.setItem('scorePlayers', JSON.stringify([]));
    }
    const actualScorePlayers = JSON.parse(localStorage.getItem('scorePlayers'));
    const scorePlayers = actualScorePlayers;

    scorePlayers.push(actualPlayer);
    localStorage.setItem('scorePlayers', JSON.stringify(scorePlayers));
    scorePlayers.sort((a, b) => {
      const one = 1;
      const negOne = -1;
      const zero = 0;
      if (a.score < b.score) {
        return one;
      }
      if (a.score > b.score) {
        return negOne;
      }
      return zero;
    });

    this.setState({ scorePlayers });
  }

  render() {
    const { scorePlayers } = this.state;
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Novo Jogo</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            { scorePlayers.map((ply, index) => (
              <tr key={ index }>
                <td>
                  <img
                    alt="gravatar"
                    src={ `https://www.gravatar.com/avatar/${md5(ply.email)}` }
                  />
                </td>
                <td>
                  <h4 data-testid={ `player-name-${index}` }>{ ply.name }</h4>
                </td>
                <td>
                  <h4 data-testid={ `player-score-${index}` }>{ ply.score }</h4>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.game.score,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
