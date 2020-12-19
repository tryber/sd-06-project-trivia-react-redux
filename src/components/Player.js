import React from 'react';
import PropTypes from 'prop-types';
import './player.css';
import { prettyDOM } from '@testing-library/react';

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

Player.propTypes = {
  entry: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};

export default Player;
