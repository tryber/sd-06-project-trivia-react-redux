import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestionsFromAPI, userScore } from '../actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      classRightAnswer: '',
      classWrongAnswer: '',
      isHidden: true,
      secondsRemaining: 30,
      disableQuestions: false,
      disableAnswers: true,
      questionIndex: 0,
    };

    this.handleDisabled = this.handleDisabled.bind(this);
    this.randomArray = this.randomArray.bind(this);
    // Timer
    this.startTimer = this.startTimer.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    const { state } = this.props;
    localStorage.setItem('state', JSON.stringify(state));
    const NUMBER_OF_QUESTIONS = 5;
    const MAGIC_NUMBER = 1000;
    const { fetchQuestionsAction } = this.props;
    fetchQuestionsAction(NUMBER_OF_QUESTIONS);
    setTimeout(this.startTimer, MAGIC_NUMBER);
  }

  componentDidUpdate(prevProps, prevState) {
    const { state, questions } = this.props;
    const { questionIndex } = this.state;
    if (JSON.stringify(prevProps.state) !== JSON.stringify(state)) {
      localStorage.setItem('state', JSON.stringify(state));
    }
    if (JSON.stringify(prevProps.questions) !== JSON.stringify(questions)) {
      localStorage.setItem('questions', JSON.stringify(questions));
    }
    if (prevState.questionIndex !== questionIndex) {
      const aSec = 1000;
      setTimeout(this.startTimer, aSec);
    }
  }

  startTimer() {
    const INTERVAL = 1000;
    const intervalID = setInterval(() => {
      this.decreaseTime();
      this.setState({
        intervalID,
        disableAnswers: false,
      });
    }, INTERVAL);
  }

  stopTimer() {
    const { intervalID } = this.state;
    clearInterval(intervalID);
  }

  decreaseTime() {
    const { secondsRemaining } = this.state;
    this.setState({
      secondsRemaining: secondsRemaining - 1,
    });

    if (secondsRemaining === 0) {
      this.stopTimer();

      this.setState({
        secondsRemaining: 0,
        classRightAnswer: 'green',
        classWrongAnswer: 'red',
        disableQuestions: true,
        isHidden: false,
      });
    }
  }

  handleNextClick() {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
      secondsRemaining: 30,
      classRightAnswer: '',
      classWrongAnswer: '',
      disableQuestions: false,
      isHidden: true,
    });
  }

  handleDisabled({ target }) {
    this.stopTimer();
    const { secondsRemaining } = this.state;
    const { handleAnswerAction } = this.props;
    const MAGIC_POINTS = 10;
    if (target.id === 'correct') {
      const questionScore = MAGIC_POINTS + (secondsRemaining * target.value);

      handleAnswerAction(questionScore);
      // const { state } = this.props;
      // localStorage.setItem('state', JSON.stringify(state));
    }
    this.setState({
      classRightAnswer: 'green',
      classWrongAnswer: 'red',
      isHidden: false,
    });
  }

  randomArray(e) {
    const correctAnswer = e.correct_answer;
    const incorrectAnswers = e.incorrect_answers;
    const newArray = incorrectAnswers.concat(correctAnswer);
    let difficultyPoints = 0;
    if (e.difficulty === 'easy') difficultyPoints = 1;
    if (e.difficulty === 'medium') difficultyPoints = 2;
    if (e.difficulty === 'hard') difficultyPoints = 1 + 2;
    newArray.sort(); // já está alterado
    const correctAnswerIndex = newArray.indexOf(correctAnswer); // pego o indice
    const {
      classRightAnswer,
      classWrongAnswer,
      secondsRemaining,
      disableQuestions,
      disableAnswers,
    } = this.state;

    return (
      <div id="answers">
        <div>
          { secondsRemaining }
        </div>
        {newArray.map((element, index) => {
          if (index === correctAnswerIndex) {
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
                id="correct"
                className={ classRightAnswer }
                value={ difficultyPoints }
                onClick={ this.handleDisabled }
                disabled={ disableQuestions || disableAnswers }
              >
                { element }
              </button>);
          }
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              className={ classWrongAnswer }
              id="wrong"
              onClick={ this.handleDisabled }
              disabled={ disableQuestions || disableAnswers }
            >
              { element }
            </button>);
        })}
      </div>
    );
  }

  renderQuestion(questionIndex) {
    const { questions } = this.props;
    if (questions.length !== 0) {
      // const questionsArray = JSON.parse(localStorage.getItem('questions'));
      // console.log('questions array: ', questionsArray);
      const questionToRender = questions[questionIndex];

      return (
        <div id="container">
          <div id="questions">
            <div data-testid="question-category">
            CATEGORIA:
              <p>{questionToRender.category}</p>
            </div>
            <div data-testid="question-text">
            PERGUNTA:
              <p>{questionToRender.question}</p>
            </div>
          </div>
          {this.randomArray(questionToRender)}
        </div>
      );
    }
  }

  render() {
    const { isHidden, questionIndex } = this.state;
    return (
      <div onChange={ this.handleDisabled }>
        <Header />
        {this.renderQuestion(questionIndex)}
        <button
          data-testid="btn-next"
          type="button"
          hidden={ isHidden }
          onClick={ this.handleNextClick }
        >
          PRÓXIMA
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAction: (numberOfQuestions) => (
    dispatch(fetchQuestionsFromAPI(numberOfQuestions))
  ),
  handleAnswerAction: (score) => (
    dispatch(userScore(score))
  ),
});

const mapStateToProps = (state) => ({
  questions: state.questions,
  state: state.state,
});

Game.propTypes = {
  fetchQuestionsAction: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  state: PropTypes.shape().isRequired,
  handleAnswerAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
