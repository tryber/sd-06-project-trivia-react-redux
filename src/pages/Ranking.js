import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/Button';

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

    console.log(ranking);

    ranking.sort((a, b) => {
      const scoreA = a.score;
      const scoreB = b.score;
      const minusOne = -1;
      if (scoreA > scoreB) return minusOne;
      if (scoreA < scoreB) return 1;
      return 0;
    });

    console.log(ranking);

    return (
      <section>
        <p data-testid="ranking-title">Ranking:</p>
        <ol>
          {ranking.map((player, index) => {
            const testIdName = `player-name-${index}`;
            const testIdScore = `player-score-${index}`;
            return (
              <li key={ index }>
                <img alt="alt-text" src={ player.avatar } height="30" width="30" />
                {'  '}
                <p data-testid={ testIdName }>
                  {player.name}
                </p>
                <p data-testid={ testIdScore }>
                  Score:
                  {' '}
                  {player.score}
                  {'  '}
                </p>
                Acertos:
                {' '}
                {player.assertions}
              </li>
            );
          })}
        </ol>
        <Link to="/">
          <Button testId="btn-go-home" value="Voltar ao Início" />
        </Link>
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
