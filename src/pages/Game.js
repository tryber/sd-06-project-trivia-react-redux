import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestionsFromAPI } from '../actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      classRightAnswer: '',
      classWrongAnswer: '',
      isDisabled: true,
      secondsRemaining: 30,
      disableQuestions: false,
    };

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.randomArray = this.randomArray.bind(this);
    // Timer
    this.startTimer = this.startTimer.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const NUMBER_OF_QUESTIONS = 1;
    const MAGIC_NUMBER = 5000;
    const { fetchQuestionsAction } = this.props;
    fetchQuestionsAction(NUMBER_OF_QUESTIONS);
    setTimeout(this.startTimer, MAGIC_NUMBER);
  }

  startTimer() {
    const INTERVAL = 1000;
    const intervalID = setInterval(() => {
      this.decreaseTime();
      this.setState({
        intervalID,
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
      });
    }
  }

  async handleQuestions() {
    //   const { questions } = this.props;
  }

  handleDisabled({ target }) {
    // Lógica para mudar o disabled do botão
    // Necessita que uma alternativa tenha sido selecionada
    // target.id ? target.className = 'green' ;

    console.log(target);
    this.setState({
      classRightAnswer: 'green',
      classWrongAnswer: 'red',
      isDisabled: false,
    });
  }

  randomArray(e) {
    const correctAnswer = e.correct_answer;
    const incorrectAnswers = e.incorrect_answers;
    const newArray = incorrectAnswers.concat(correctAnswer);

    newArray.sort(); // já está alterado
    const correctAnswerIndex = newArray.indexOf(correctAnswer); // pego o indice
    const {
      classRightAnswer,
      classWrongAnswer,
      secondsRemaining,
      disableQuestions,
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
                value={ element }
                onClick={ this.handleDisabled }
                disabled={ disableQuestions }
              >
                { element }
              </button>);
          }
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              value={ element }
              className={ classWrongAnswer }
              id="wrong"
              onClick={ this.handleDisabled }
              disabled={ disableQuestions }
            >
              { element }
            </button>);
        })}
      </div>
    );
  }

  render() {
    const { isDisabled } = this.state;
    const { questions } = this.props;
    return (
      <div onChange={ this.handleDisabled }>
        <Header />
        {questions.map((element, index) => (
          element.results.map((e) => (
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
              </div>
              {this.randomArray(e)}
              <button
                data-testid="btn-next"
                type="button"
                hidden={ isDisabled }
                onClick={ this.handleDisabled }
              >
                PRÓXIMA
              </button>
            </div>
          ))))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAction: (numberOfQuestions) => (
    dispatch(fetchQuestionsFromAPI(numberOfQuestions))
  ),
});

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Game.propTypes = {
  fetchQuestionsAction: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
