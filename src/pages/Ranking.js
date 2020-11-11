import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { name, score, avatar, assertions } = this.props;
    const ranking = [];

    name.forEach((_element, index) => {
      const temp = {
        name: '',
        score: 0,
        avatar: '',
        assertions: 0,
      };
      temp.name = name[index];
      temp.score = score[index];
      temp.avatar = avatar[index];
      temp.assertions = assertions[index];
      ranking.push(temp);
    });

    ranking.sort((a, b) => {
      const scoreA = a.score;
      const scoreB = b.score;
      const minusOne = -1;
      if (scoreA > scoreB) return 1;
      if (scoreA < scoreB) return minusOne;
      return 0;
    });

    return (
      <section>
        <ol>
          {ranking.map((player, index) => {
            const testId = `player-name-${index}`;
            return (
              <li data-testid={ testId } key={ index }>
                <img alt="alt-text" src={ player.avatar } height="30" width="30" />
                {'  '}
                Jogador:
                {' '}
                {player.name}
                {'  '}
                Score:
                {' '}
                {player.score}
                {'  '}
                Acertos:
                {' '}
                {player.assertions}
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.ranking.name,
    score: state.ranking.score,
    avatar: state.ranking.avatar,
    assertions: state.ranking.assertions,
  };
}

export default connect(mapStateToProps)(Ranking);
