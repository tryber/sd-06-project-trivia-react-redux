import React from 'react';
import { Link } from 'react-router-dom';
import BtnHome from '../componente/BtnHome';
import Header from '../componente/Header';

class Ranking extends React.Component {
  constructor() {
    super();

    this.stateAssertionsScore = this.stateAssertionsScore.bind(this);
    this.state = {
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    this.stateAssertionsScore();
  }

  stateAssertionsScore() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    this.setState({
      assertions,
      score,
    });
  }

  render() {
    const { assertions, score } = this.state;
    const three = 3;
    return (
      <section className="feedback-header-container">
        <Header />
        <div className="feedback-container">
          <h2
            data-testid="feedback-text"
            className="feedback-text"
          >
            { assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
          </h2>
          <img className="gif-feedback" src={ assertions >= three ? 'https://media0.giphy.com/media/g9582DNuQppxC/200.gif' : 'https://media2.giphy.com/media/xThtavV3Ds2631gcWk/giphy.gif'} />
          <p data-testid="feedback-total-score" className="feedback-score">Pontos: { score }</p>
          <p data-testid="feedback-total-question" className="feedback-total">Acertos: { assertions }</p>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar Novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
          <BtnHome />
        </div> 
      </section>
    );
  }
}

export default Ranking;
