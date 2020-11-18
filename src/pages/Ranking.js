import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userClear } from '../actions';

class Ranking extends React.Component {
  render() {
    const { email, name, score, history, handleUserClear } = this.props;
    const gravatarImage = `https://www.gravatar.com/avatar/${md5(email)}`;
    const rankingObject = {
      gravatarImage,
      name,
      score,
    };
    if (localStorage.getItem('ranking')) {
      const prev = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...prev, rankingObject]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([rankingObject]));
    }

    const myArray = JSON.parse(localStorage.getItem('ranking'));
    myArray.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ul>
          {myArray.map((element, index) => (
            <li key={ index }>
              <div>
                <span><img src={ element.gravatarImage } alt="profile" /></span>
                <span
                  data-testid={ `player-name-${index}` }
                >
                  {element.name}
                </span>
                <span
                  data-testid={ `player-score-${index}` }
                >
                  {element.score}
                </span>
              </div>
            </li>

          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            localStorage.removeItem('questions');
            handleUserClear();
            history.push('/');
          } }
        >
              Voltar ao Login
        </button>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
  handleUserClear: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleUserClear: () => (
    dispatch(userClear())
  ),
});

const mapStateToProps = (state) => ({
  name: state.state.player.name,
  email: state.state.player.gravatarEmail,
  score: state.state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
