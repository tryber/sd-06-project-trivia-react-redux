import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      testScore: 0,
      testScorePoint: 0,
    }
    this.renderFeedback = this.renderFeedback.bind(this);
    this.renderTotalAnswer = this.renderTotalAnswer.bind(this);
    this.renderTotalScore = this.renderTotalScore.bind(this);
  }

  componentWillMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({
      testScore: state.player.assertions,
      testScorePoint: state.player.score,
    })
  }

  renderFeedback() {
    const { testScore } = this.state;
    if( testScore < 3) {
      return <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    } else {
      return <h1 data-testid="feedback-text">Mandou bem!</h1>
    }
  }

  renderTotalAnswer() {
    const { testScore } = this.state;
    if( testScore === 0) {
      return <h2 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h2>
    } else {
      return <h2>Acertou<span data-testid="feedback-total-question">{testScore}</span>perguntas</h2>
    }
  }

  renderTotalScore() {
    const { testScorePoint } = this.state;
  return <h2 data-testid="feedback-total-score">{testScorePoint}</h2>
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          {this.renderFeedback()}
          {this.renderTotalAnswer()}
          Pontuacao: {this.renderTotalScore()}
        </div>
        <Link to="/"><button data-testid="btn-play-again" className="btn">Jogar novamente</button></Link>
        <Link to="/ranking"><button data-testid="btn-ranking" className="btn">Ver Ranking</button></Link>
      </div>
    );
  }
}

export default Feedback;
