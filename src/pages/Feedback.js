import React from 'react';
import { Link } from 'react-router-dom';
import HeaderGame from '../components/HeaderGame';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      hits: 3,
      score: 0,
    }
    this.feedbackPageScore = this.feedbackPageScore.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      score: this.state.hits * 10,
    })
  }
  
  feedbackPageScore() {
    if(this.state.score <= 30) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      )
    } else {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      )
    }
  }

  render() {
    return (
      <>
        <>
          <HeaderGame />
        </>
        <div data-testid="feedback-total-score">
            {this.feedbackPageScore()}
            <h2 data-testid="feedback-total-question"
          >
            Acertos: {this.state.hits}
            Pontos: {this.state.score}
          </h2>
        </div>
        <Link to="/ranking"><button data-testid="btn-ranking">Ver Ranking</button></Link>
        <Link to="/"><button data-testid="btn-play-again">Jogar Novamente</button></Link>
      </>
    );
  }
}

export default Feedback;
