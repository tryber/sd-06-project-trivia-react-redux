import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { fetchApiQuestions, requestQuestionsSuccess } from '../actions';

class ScreenGame extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.teste = this.teste.bind(this);
  // }

  componentDidMount() {
    // const { token } = this.state;
    // const { getTriviaQuestions, token } = this.props;
    // console.log(token);
    // const tokenLocalStorage = localStorage.getItem('token');
    // getTriviaQuestions(tokenLocalStorage);
    // console.log(`Imprime token state ${token}`);
    // console.log(`Imprime token localStorage ${tokenLocalStorage}`);
    // const resposta = await getTriviaQuestions(tokenLocalStorage);
    // const { data: { results } } = resposta;
    // console.log(results);
  }

  render() {
    const { questions } = this.props;
    // console.log("Category", questions.results.category);
    // console.log("Resultado do state questions", questions.tokenReducer.questions[0]);
    return (
      <div>
        <div className="category">
          { questions && questions.results && questions.results.map((item) => (
            <p
              data-testid="question-category"
              key={ item.category }
            >
              {item.category}
            </p>
          ))}
        </div>
        <div className="questions">
          { questions && questions.results && questions.results.map((item) => (
            <p
              data-testid="question-text"
              key={ item.category }
            >
              {item.question}
            </p>
          ))}
        </div>
        <div className="correctAnswer">
          { questions && questions.results && questions.results.map((item) => (
            <p
              data-testid="correct-answer"
              key={ item.category }
            >
              {item.correct_answer}
            </p>
          ))}
        </div>
        <div className="incorrectAnswers">
          {questions && questions.results && questions.results.map((item, index) => (
            <button
              type="button"
              key={ item.question }
              data-testid={ `wrong-answer-${index}` }
            >
              {item.incorrect_answers}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.tokenReducer.questions,
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token) => dispatch(fetchApiQuestions(token)),
  getQuestions: (data) => dispatch(requestQuestionsSuccess(data)),
});

ScreenGame.propTypes = {
  questions: propType.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
