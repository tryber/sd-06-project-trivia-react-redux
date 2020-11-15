import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import questionsAPI from '../services/questionAPI';
import { ScoreAndAssertionsFuncion } from '../actions';
import Header from '../components/Header';

class Gamepage extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      buttonBorder: false,
      timer30: 30,
    };

    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
  }

  async componentDidMount() {
    const { scoreAndAssertionsAction } = this.props;
    const tokenLocal = localStorage.getItem('token');
    await this.questionsGet(tokenLocal);
    this.timer();
    scoreAndAssertionsAction(0,0);
  }

  componentWillUnmount() {
    clearInterval(this.aux);
  }

  async questionsGet(tokenLocal) {
    await questionsAPI(tokenLocal);
  }

  timer() {
    const miliseconds = 1000;
    this.aux = setInterval(this.countdown, miliseconds);
  }

  changePage() {
    const { history } = this.props;
    history.push('/feedback');
  }

  // testing score
  scorePoint() {
    console.log('função placar');
    const { questionIndex, timer30 } = this.state;
    const { questions } = this.props;
    const difficultyLevel = questions[questionIndex].difficulty;
    console.log(difficultyLevel);
    const three = 3;
    const ten = 10;
    let levelPoint = 1;
    if (difficultyLevel === 'easy') levelPoint = 1;
    if (difficultyLevel === 'medium') levelPoint = 2;
    if (difficultyLevel === 'hard') levelPoint = three;
    console.log('o que é level point', levelPoint);
    console.log('o que é timer', timer30);
    const answerPoint = (ten + (timer30 * levelPoint));
    return answerPoint;
  }

  // testing score
  handleUniqueAnswer(event) {
    const valueTextButton = event.target.innerHTML;
    const { questionIndex } = this.state;
    const { questions, scoreAndAssertionsAction, score, assertions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    console.log('o que é class name', valueTextButton);
    console.log('qual resposta é a certa', correctAnswer);
    const atualPoints = (valueTextButton === correctAnswer) ? this.scorePoint() : 0;
    const currentAssertions = (valueTextButton === correctAnswer)
    ? assertions + 1 : assertions + 0;
    console.log('soma atual de pontos', atualPoints);
    const currentScore = score + atualPoints;
    scoreAndAssertionsAction(currentScore,currentAssertions);
  }

  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.changePage();
    }
    this.setState((state) => ({
      questionIndex: (state.questionIndex + 1) % questions.length,
      buttonBorder: false,
      timer30: 30,
    }));
    this.timer();
  }

  countdown() {
    const { timer30 } = this.state;
    const { buttonBorder } = this.state;
    this.setState({
      timer30: timer30 - 1,
    });
    if (timer30 <= 0) {
      clearInterval(this.aux);
      this.setState({
        buttonBorder: !buttonBorder,
        timer30,
      });
    }
  }

  handleClick(event) {
    this.handleUniqueAnswer(event);
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
    clearInterval(this.aux);
  }

  showNextButton() {
    const { buttonBorder } = this.state;
    if (buttonBorder) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.changeQuestion() }
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, buttonBorder, timer30 } = this.state;
    const questionAtual = questions[questionIndex];

    return questions && questions.length && (
      <div className="gamepage-container">
        <Header />
        <div className="timer">
          <span>
            Timer:
          </span>
          { timer30 }
        </div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            {questionAtual && questionAtual.category}
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            { questionAtual && questionAtual.question }
          </div>
        </div>
        <div className="gamepage-answer">
          { questionAtual && questionAtual.incorrect_answers
            .map((result, i) => (
              <div key={ result }>
                <button
                  className={ !buttonBorder ? 'none-answer' : 'wrong' }
                  onClick={ this.handleClick }
                  data-testid={ `wrong-answer-${i}` }
                  type="button"
                  disabled={ buttonBorder }
                >
                  {result}
                </button>
              </div>
            ))}
          <button
            className={ !buttonBorder ? 'none-answer' : 'correct' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            id="correct"
            disabled={ buttonBorder }
          >
            { questionAtual && questionAtual.correct_answer }
          </button>
          { this.showNextButton() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  score: state.score.score,
  assertions: state.assertions.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  scoreAndAssertionsAction: (score, assertions) =>
  dispatch(ScoreAndAssertionsFuncion(score,assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);

Gamepage.propTypes = {
  questionAtual: PropTypes.arrayOf(Object).isRequired,
  questions: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  scoreAndAssertionsAction: PropTypes.func.isRequired,
}.isRequired;
