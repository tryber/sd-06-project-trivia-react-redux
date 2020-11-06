import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../services/triviaAPI';
import { requestQuestions } from '../actions';

class Game extends React.Component {
  constructor() {
    super();

    this.handleFetch = this.handleFetch.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  async componentDidMount() {
    const NUMBER_OF_QUESTIONS = 5;
    const { receivedQuestions } = this.props;
    const questions = await this.handleFetch(NUMBER_OF_QUESTIONS);
    receivedQuestions(questions); //  populou o state
  }

  async handleFetch(num) {
    const getQuestions = await triviaAPI(num);
    return getQuestions;
  }

  async handleQuestions() {
    //   const { questions } = this.props;
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        {questions.map((element, index) => (
          element.results.map((e, i) => (
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
              <div id="answers">
                <div data-testid="correct-answer">
                RESPOSTA CORRETA:
                  <p>{e.correct_answer}</p>
                </div>
                <div data-testid={ `wrong-answer-${i}` }>
                RESPOSTAS ERRADAS:
                  {e.incorrect_answers.map((answer, j) => <p key={ j }>{answer}</p>)}
                </div>
              </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
