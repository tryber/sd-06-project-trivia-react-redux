import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  componentDidMount() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const state = JSON.parse(localStorage.getItem('ranking'));
    const player = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    if (state) return localStorage.setItem('ranking', JSON.stringify([...state, player]));
    return localStorage.setItem('ranking', JSON.stringify([player]));
  }

  // handleClick() {
  //   localStorage.setItem('savedState', '');
  // }

  render() {
    const { name, assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        { assertions < three ? (
          <div data-testid="feedback-text">Podia ser melhor...</div>
        ) : (
          <div data-testid="feedback-text">Mandou bem!</div>
        ) }

        <h3 data-testid="header-player-name">{ name }</h3>

        <div>
          Você acertou
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          questões
        </div>

        <div>
          Um total de
          <span data-testid="feedback-total-score">
            { score }
          </span>
          pontos
        </div>

        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.userReducer.player.assertions,
  score: state.userReducer.player.score,
  name: state.userReducer.name,
  gravatarEmail: state.userReducer.email,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
