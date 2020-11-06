import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, updateLoading } from '../actions';
import Header from '../components/Header';
import '../css/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      answered: false,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
  }

  componentDidMount() {
    const { questions } = this.props;
    console.log('ComponentDidMount: ', questions);
  }

  chooseAnswer() {
    this.setState({ answered: true });
  }

  renderQuestions() {
    const { questions } = this.props;
    console.log('questions: ', questions);
    const { questionNumber } = this.state;
    if (questions[questionNumber] === undefined) return null;
    return (
      <div>
        <h4 data-testid="question-category">{ questions[questionNumber].category }</h4>
        <h4 data-testid="question-text">{ questions[questionNumber].question }</h4>
      </div>
    );
  }

  renderAnswers() {
    const { questionNumber, answered } = this.state;
    const { chooseAnswer } = this;
    const { questions } = this.props;
    if (questions[questionNumber] === undefined) return null;
    const correctAnswerPosition = Math
      .floor(Math
        .random() * questions[questionNumber].incorrect_answers.length + 1);
    const answers = questions[questionNumber].incorrect_answers;

    if (!answered) {
      answers.splice(correctAnswerPosition, 0, questions[questionNumber].correct_answer);
    }

    return (
      <div>
        {
          answers.map((answer, index) => {
            if (answer === questions[questionNumber].correct_answer) {
              return (
                <button
                  className={ answered ? 'correct-answer' : null }
                  type="button"
                  onClick={ chooseAnswer }
                  data-testid="correct-answer"
                  key={ index }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                className={ answered ? 'wrong-answer' : null }
                type="button"
                onClick={ chooseAnswer }
                data-testid={ `wrong-answer-${index}` }
                key={ index }
              >
                { answer }
              </button>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { renderAnswers, renderQuestions } = this;

    return (
      <div>
        <div>
          <Header />
        </div>
        { renderQuestions() }
        { renderAnswers() }
      </div>
    );
  }
}

const mapStateToProps = ({ game: { questions, loading } }) => ({
  questions,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAPIQuestions: () => dispatch(fetchQuestions()),
  setUpdateLoading: (loading) => dispatch(updateLoading(loading)),
});

Game.propTypes = {
  getAPIQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setUpdateLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
