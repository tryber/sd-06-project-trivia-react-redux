import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionsAPI } from '../servicesAPI';
import Header from './Header';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      selectedAnswer: '',
      assertions: 0,
      answersDisabled: false,
      repeatCount: true,
    };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
    this.count = this.count.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  async componentDidMount() {
    // const token = localStorage.getItem('token');
    const questionsQuantity = 5;
    const token = '5b27ff1eca29d6898a998a1c4e77ac6355f56056e06f83b30348e64e3f31a9d2';
    const questions = (token !== '') ? await questionsAPI(questionsQuantity, token) : [];
    this.saveQuestions(questions);
    const { name, gravatarEmail } = this.props;
    const gameState = { 
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      }
    }
    localStorage.setItem('state', JSON.stringify(gameState))
  }

  saveQuestions(questions) {
    this.setState({ questions });
  }

  handleAnswers(questionObj) {
    const incorrectAnswers = questionObj.incorrect_answers
      .map((incorrect) => ({ ans: incorrect, type: 'incorrect' }));
    const correctAnswer = { ans: questionObj.correct_answer, type: 'correct' };
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const numberOfAnswers = allAnswers.length;
    const allAnswersRandom = [];
    for (let i = 0; i < numberOfAnswers; i += 1) {
      const indexRandom = Math.round(Math.random() * (allAnswers.length - 1));
      allAnswersRandom[i] = allAnswers[indexRandom];
      allAnswers.splice(indexRandom, 1);
    }

    let indexOfIncorrectAnswers = 0;
    return allAnswersRandom.map((answer, index) => {
      const { ans, type } = answer;
      const testId = (type === 'correct')
        ? 'correct-answer'
        : `wrong-answer-${indexOfIncorrectAnswers}`;
      indexOfIncorrectAnswers = (type === 'incorrect')
        ? indexOfIncorrectAnswers + 1
        : indexOfIncorrectAnswers;
      const { answersDisabled, selectedAnswer } = this.state;

      return (
        <button
          key={ index }
          type="button"
          data-testid={ testId }
          className={ (selectedAnswer === '') ? '' : `${type}-answer` }
          onClick={ (event) => this.handleUniqueAnswer(type, event) }
          disabled={ answersDisabled }
        >
          { ans }
        </button>
      );
    });
  }

  handleQuestions(questions) {
    const interval = 30000;
    const { repeatCount, actualQuestion } = this.state;

    if (repeatCount) this.count(interval);

    
    const level = {
      easy: 1,
      medium: 2,
      hard: 3,
    }
    // const difficulty = questions[actualQuestion].difficulty;
    const currentQuestion = questions[actualQuestion];
    const difficultyMultiplier = level[currentQuestion.difficulty];
    this.handleScore(difficultyMultiplier);
    // this.handleScore(difficulty, multiplier);

    // console.log(level[questions[0].difficulty])
    // console.log(questions[0].difficulty)
    // console.log(level[questions[0].difficulty])

    // console.log(currentQuestion)

    // return questions.map((questionObj, index) => {
      // this.setState({ currentQuestionDifficulty: questionObj.difficulty })
      // console.log(questionObj.difficulty)
      return (
        <article>
          <p data-testid="question-category">{ currentQuestion.category }</p>
          <p data-testid="question-text">{ currentQuestion.question }</p>
          <div>
            { this.handleAnswers(currentQuestion) }
          </div>
        </article>
      );
    // });
  }

  count(interval) {
    const thousand = 1000;
    let timer = interval / thousand;
    let id = '';
    const frame = () => {
      if (timer === 0) {
        this.handleUniqueAnswer('incorrect', null);
        clearInterval(id);
      } else {
        document.getElementById('timer').innerHTML = timer;
        timer -= 1;
      }
    };
    id = setInterval(frame, thousand);
  }

  handleScore(difficultyMultiplier) {
    const timer = document.getElementById('timer').innerHTML;
    const { selectedAnswer, assertions } = this.state;
    const { name, gravatarEmail } = this.props;
    // console.log(name, gravatarEmail)

    if (selectedAnswer === 'correct') {
      const score = 10 + (timer * difficultyMultiplier)

      // console.log('is it?', selectedAnswer)
      // console.log(score)
      
      const gameState = { 
        player: {
          name,
          assertions,
          score,
          gravatarEmail,
        }
      }
      console.log(gameState)

      localStorage.setItem('state', JSON.stringify(gameState))
      console.log(localStorage.getItem('state'))
    }

  }

  handleUniqueAnswer(type, event) {
    const point = (type === 'correct') ? 1 : 0;
    const { name, gravatarEmail } = this.props
    const gameState = { 
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      }
    }
    localStorage.setItem('state', JSON.stringify(gameState))
    this.setState((previousState) => ({
      selectedAnswer: type,
      assertions: previousState.assertions + point,
      repeatCount: false,
      answersDisabled: true,
    }));
    
    // const isItCorrect = event.target.attributes[1].nodeValue;
    // console.log(isItCorrect)
    // if (isItCorrect) {
    //   this.handleScore()
    // }
  }

  render() {
    const { questions, actualQuestion } = this.state;
    return (
      <div>
        <p id="timer" />
        <Header />
        { questions.length > 0
          ? this.handleQuestions(questions) : 'Sem Questões' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Game);
