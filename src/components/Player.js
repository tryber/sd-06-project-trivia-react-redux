import React from 'react';
import './player.css';

const Player = ({ entry, index }) => {
  const { name, picture, score } = entry;
  return (
    <li>
      <div>
        <img src={picture} alt={name} />
        <h5 data-testid={`player-name-${index}`}>{ name }</h5>
        <h5 data-testid={`player-score-${index}`}>{ score }</h5>
      </div>
    </li>
  );
};

export default Player;
