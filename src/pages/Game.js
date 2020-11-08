import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../services/triviaAPI';
import { requestQuestions } from '../actions';
import Timer from '../components/Timer.jsx';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      classRight: '',
      classWrong: '',
      isDisabled: true,
      disableQuestions: false,
      secondsRemaining: 30,
      score: 0,
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.randomArray = this.randomArray.bind(this);
    //Função do timer
    this.decreaseTime = this.decreaseTime.bind(this);
    this.disableWhenTimeout = this.disableWhenTimeout.bind(this);
  }

  async componentDidMount() {
    const NUMBER_OF_QUESTIONS = 1;
    const { receivedQuestions } = this.props;
    const questions = await this.handleFetch(NUMBER_OF_QUESTIONS);
    receivedQuestions(questions); //  populou o state
  }

  disableWhenTimeout() {
    const { secondsRemaining } = this.state;
    if (secondsRemaining < 1) {
      this.setState({
        classWrong: 'red',
        disableQuestions: true,
      });
    }
  }

  decreaseTime() {
    const { secondsRemaining } = this.state;
    this.setState({
      secondsRemaining: secondsRemaining - 1,
    });
  }

  async handleFetch(num) {
    const getQuestions = await triviaAPI(num);
    return getQuestions;
  }

  async handleQuestions() {
    //   const { questions } = this.props;
  }

  handleDisabled() {
    // { target }
    // Lógica para mudar o disabled do botão
    // Necessita que uma alternativa tenha sido selecionada
    // target.id ? target.className = 'green' ;

    this.setState({
      classRight: 'green',
      classWrong: 'red',
      isDisabled: true,
    });
  }

  randomArray(e) {
    const correctAnswer = e.correct_answer;
    const incorrectAnswers = e.incorrect_answers;
    const newArray = incorrectAnswers.concat(correctAnswer);

    newArray.sort(); // já está alterado 
    const myIndex = newArray.indexOf(correctAnswer); // pego o indice
    const { classRight, classWrong, disableQuestions, secondsRemaining } = this.state;
    return (
      <div id="answers">
        <Timer
          seconds={secondsRemaining}
          classWrong={classWrong}
          disableQuestions={disableQuestions}
          handleTime={this.decreaseTime}
          handleDisabled={this.disableWhenTimeout}
        />
        {newArray.map((element, index) => {
          if (index === myIndex) {
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
                id="correct"
                className={ classRight }
                value={ element }
                disabled={ disableQuestions }
                onClick={ this.handleDisabled }
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
              className={ classWrong }
              id="wrong"
              disabled={ disableQuestions }
              onClick={ this.handleDisabled }
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
        <div id="countdown" value="30" />
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
                disabled={ isDisabled }
                // onClick={ this.handleDisabled }
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
  receivedQuestions: (e) => dispatch(requestQuestions(e)),
});

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Game.propTypes = {
  receivedQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
