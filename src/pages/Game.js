import React from 'react';
import { fetchQuestions } from '../services';

class Game extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    const questions = await fetchQuestions(localStorage.getItem('token'));
    this.getQuestions(questions);
  }

  getQuestions(questions) {
    this.setState({
      questions: [questions],
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <div className="game-container">
        {questions.map((element, index) => {
          return (
            <div className="square" key={ element.results[index].question }>
              <header>
                <img
                  data-testid="header-profile-picture"
                  alt="profile"
                />
                <p data-testid="header-player-name">Jogador</p>
                <p data-testid="header-score">0</p>
              </header>
              <div className="questions">
                <h3 data-testid="question-category">{ element.results[index].category }</h3>
                <p data-testid="question-text">{ element.results[index].question }</p>
              </div>
              <div className="answers">a</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Game;
