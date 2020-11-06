import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.renderNext = this.renderNext.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.chooseNextQuestion = this.chooseNextQuestion.bind(this);
  }

  chooseAnswer() {
    this.setState({ answered: true });
  }

  chooseNextQuestion() {
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      answered: false,
    }));
  }

  renderQuestions() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
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

  renderNext() {
    const { answered } = this.state;
    const { chooseNextQuestion } = this;
    if (answered) {
      return (
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ chooseNextQuestion }
          >
            Próxima
          </button>
        </div>
      );
    }
  }

  render() {
    const { renderAnswers, renderQuestions, renderNext } = this;

    return (
      <div>
        <div>
          <Header />
        </div>
        { renderQuestions() }
        { renderAnswers() }
        { renderNext() }
      </div>
    );
  }
}
// fiz refatoração do parâmetro da função para ficar legível
const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Game);
