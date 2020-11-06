import React from 'react';
import PropTypes from 'prop-types';

class RankingList extends React.Component {
 

render(){
  const { name, hash, score } = this.props;
  return (
    <div>
      <ol>
        <img
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt={`${name} profile`}
        />
        <li data-testid="player-name-${index}"></li>
        <li data-testid="player-score-${index}">{score}</li>
      </ol>
    </div>
  );
}
}

export default RankingList;

RankingList.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
