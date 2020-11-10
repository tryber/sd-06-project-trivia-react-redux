import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './player.css';

const Player = ({ entry, index }) => {
  const { name, picture, score } = entry;
  const image = md5(picture);
  return (
    <li>
      <div>
        <img src={ `https://www.gravatar.com/avatar/${image} }` } alt={ name } />
        <h5 data-testid={ `player-name-${index}` }>{ name }</h5>
        <h5 data-testid={ `player-score-${index}` }>{ score }</h5>
      </div>
    </li>
  );
};

Player.propTypes = {
  entry: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default Player;
