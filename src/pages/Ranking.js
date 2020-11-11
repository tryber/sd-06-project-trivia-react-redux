import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import NenhumRegistro from '../components/NenhumRegistroEncontrado';
import Player from '../components/Player';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      players: JSON.parse(localStorage.ranking || '[]'),
    };
    this.sortingPlayers = this.sortingPlayers.bind(this);
  }

  componentDidMount() {
    this.sortingPlayers();
  }

  sortingPlayers() {
    const { players } = this.state;
    if (players.length > 1) {
      this.setState({
        players: players.sort((a, b) => (
          parseInt(b.score, 10) - parseInt(a.score, 10))),
      });
    }
  }

  render() {
    const { players } = this.state;
    return (
      <div className="full-container">
        <Link to="/">
          <button data-testid="btn-go-home" className="btn btn-info home" type="button">
            <FaHome />
          </button>
        </Link>
        <h1 data-testid="ranking-title">Melhores Jogadas</h1>
        <ol>
          {
            players ? players.map((entry, index) => (
              <Player key={ `${index}has` } index={ index } entry={ entry } />
            ))
              : <NenhumRegistro />
          }
        </ol>
      </div>
    );
  }
}

export default Ranking;
