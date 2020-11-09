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
    };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.randomArray = this.randomArray.bind(this);
    // Timer
    this.startTimer = this.startTimer.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

<<<<<<< HEAD
  async componentDidMount() {
    const NUMBER_OF_QUESTIONS = 5;
    const { receivedQuestions } = this.props;
    const questions = await this.handleFetch(NUMBER_OF_QUESTIONS);
    receivedQuestions(questions.results); //  populou o state
=======
  componentDidMount() {
    const { state } = this.props;
    localStorage.setItem('state', JSON.stringify(state));
    const NUMBER_OF_QUESTIONS = 1;
    const MAGIC_NUMBER = 5000;
    const { fetchQuestionsAction } = this.props;
    fetchQuestionsAction(NUMBER_OF_QUESTIONS);
    setTimeout(this.startTimer, MAGIC_NUMBER);
>>>>>>> main-group-27
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props;
    if (JSON.stringify(prevProps.state) !== JSON.stringify(state)) {
      localStorage.setItem('state', JSON.stringify(state));
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

  async handleQuestions() {
    //   const { questions } = this.props;
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

  render() {
    const { isHidden } = this.state;
    const { questions } = this.props;
    return (
      <div onChange={ this.handleDisabled }>
        <Header />
        {questions.map((e, index) => (
          <div key={ index } id="container">
            <div id="questions">
              <div data-testid="question-category">
              CATEGORIA:
                <p>{e.category}</p>
              </div>
              <div data-testid="question-text">
              PERGUNTA:
                <p>{e.question}</p>
              </div>
<<<<<<< HEAD
=======
              {this.randomArray(e)}
              <button
                data-testid="btn-next"
                type="button"
                hidden={ isHidden }
                onClick={ this.handleDisabled }
              >
                PRÓXIMA
              </button>
>>>>>>> main-group-27
            </div>
            {this.randomArray(e)}
            <button
              data-testid="btn-next"
              type="button"
              hidden={ isDisabled }
              // onClick={ this.handleDisabled }
            >
              PRÓXIMA
            </button>
          </div>
        ))}
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
<<<<<<< HEAD
  questions: state.questions,
=======
  questions: state.questions.questions,
  state: state.state,
>>>>>>> main-group-27
});

Game.propTypes = {
  fetchQuestionsAction: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
  state: PropTypes.shape().isRequired,
  handleAnswerAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
