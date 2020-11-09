import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../services/triviaAPI';
import { requestQuestions } from '../actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      classRight: '',
      classWrong: '',
      isDisabled: true,
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.randomArray = this.randomArray.bind(this);
  }

  async componentDidMount() {
    const NUMBER_OF_QUESTIONS = 5;
    const { receivedQuestions } = this.props;
    const questions = await this.handleFetch(NUMBER_OF_QUESTIONS);
    receivedQuestions(questions.results); //  populou o state
  }

  async handleFetch(num) {
    const getQuestions = await triviaAPI(num);
    return getQuestions;
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
      classRight: 'green',
      classWrong: 'red',
      isDisabled: false,
    });
  }

  randomArray(e) {
    const correctAnswer = e.correct_answer;
    const incorrectAnswers = e.incorrect_answers;
    const newArray = incorrectAnswers.concat(correctAnswer);

    newArray.sort(); // já está alterado
    const myIndex = newArray.indexOf(correctAnswer); // pego o indice
    const { classRight, classWrong } = this.state;
    return (
      <div id="answers">
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
  receivedQuestions: (e) => dispatch(requestQuestions(e)),
});

const mapStateToProps = (state) => ({
  questions: state.questions,
});

Game.propTypes = {
  receivedQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
