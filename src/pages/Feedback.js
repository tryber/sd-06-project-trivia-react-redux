import React from 'react';
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
      <section>
        <Header />
        <p
          data-testid="feedback-text"
        >
          { assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </section>
    );
  }
}

export default Ranking;
