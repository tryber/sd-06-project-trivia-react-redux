import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { fetchApiQuestions, requestQuestionsSuccess } from '../actions';
import FeedbackHeader from './FeedbackHeader';
import '../App.css';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      btnNext: true,
    };
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    this.setState({
      answered: true,
      btnNext: false,
    });
  }

  render() {
    const { questions } = this.props;
    const { answered, btnNext } = this.state;
    return (
      <div className="game-container">
        <div className="header">
          <FeedbackHeader />
        </div>
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
            <button
              type="button"
              data-testid="correct-answer"
              key={ item.category }
              id="correct"
              onClick={ this.changeColor }
              className={ answered ? 'green-border' : null }
            >
              {item.correct_answer}
            </button>
          ))}
        </div>
        <div className="incorrectAnswers">
          {questions
            && questions.results
            && questions.results[0].incorrect_answers.map((item, index) => (
              <button
                type="button"
                key={ item.question }
                data-testid={ `wrong-answer-${index}` }
                id="incorrect"
                onClick={ this.changeColor }
                className={ answered ? 'red-border' : null }
              >
                {item}
              </button>
            ))}
        </div>
        <div className="btnNext">
          <button
            type="button"
            data-testid="btn-next"
            hidden={ btnNext }
          >
            Próxima
          </button>
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
