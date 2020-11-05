import React, { Component } from 'react';
import fetchGameQuestions from '../services/fetchGameQuestions';
import './style_sheets/Game.css';

class Game extends Component {
  constructor() {
    super();

    this.saveQuestionsToState = this.saveQuestionsToState.bind(this);

    this.state = {
      questions: [],
      index: 0,
      maxIndex: 0,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const API_RESPONSE = await fetchGameQuestions();
    const QUESTIONS = API_RESPONSE.results;
    this.saveQuestionsToState(QUESTIONS);
  }

  saveQuestionsToState(questions) {
    this.setState({ questions, maxIndex: questions.length - 1, isLoading: false });
  }

  renderGameBoard() {
    const { questions, index } = this.state;
    const currentQuestion = questions[index];

    return (
      <main className="game-board">
        <section className="game-board-container">
          <div className="question-category" data-testid="question-category">
            {currentQuestion.category}
          </div>
          <div className="question-text" data-testid="question-text">
            {currentQuestion.question}
          </div>
        </section>
        <section className="game-board-container">
          <div className="game-answers">
            Answers
          </div>
        </section>
      </main>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? <p>Loading</p> : this.renderGameBoard()}
      </div>
    );
  }
}

export default Game;
