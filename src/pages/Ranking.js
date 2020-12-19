import React from 'react';
import { Link } from 'react-router-dom';
import NenhumRegistro from '../components/NenhumRegistroEncontrado';
import Player from '../components/Player';

let players = JSON.parse(localStorage.getItem('state'));
players.players ? players = players.players.sort((a, b) =>
(parseInt(b.score, 10) - parseInt(a.score, 10))) : players = undefined;

const Ranking = () => (
  <div>
    <h1>Melhores Jogadas</h1>
    <ol>
      {
        players ? players.map((entry, index) => (
          <Player key={`${index}has`} index={ index } entry={ entry } />
        ))
        : <NenhumRegistro />
      }
    </ol>
    <Link to="/">
      <button type="button">
        Home
      </button>
    </Link>
  </div>
);


export default Ranking;
