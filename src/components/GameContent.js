import React from 'react';
import { connect } from 'react-redux';
import './GameContent.css';
import PropTypes from 'prop-types';

import { addResult } from '../actions/game';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {},
      isLoading: true,
      current: 0,
      answer: false,
      sort: [],
      results: [],
    };

    this.shuffle = this.shuffle.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.resetAnswer = this.resetAnswer.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
    this.shuffle([1, 2, 1 + 2, 2 + 2]);
    this.setCounter();
  }

  componentDidUpdate() {
    const maxNumberOfAnswers = 5;
    const { dispatchResults } = this.props;
    const { results } = this.state;
    if (results.length === maxNumberOfAnswers) dispatchResults(results);
  }

  async setCounter() {
    const thirtySeconds = 30000;
    setTimeout(() => {
      const thirty = 30;
      let i = thirty;
      while (i > 0) {
        i = countSeconds(i);

        console.log('durante', i);
      }
    }, thirtySeconds);
  }

  setResult(target) {
    return target.className === 'correct';
  }

  resetAnswer() {
    this.setState({ answer: false });
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    await fetch(url)
      .then((response) => response.json())
      .then((a) => this.setState({ element: a, isLoading: false, answer: false }));
  }

  async handleClickAnswer(event) {
    const { target } = event;
    const { results } = this.state;

    this.setState(() => ({ answer: true }), async () => {
      const result = this.setResult(target);
      this.setState({ results: [...results, result], isLoading: true });
      this.fetchApi();
    });
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue = 0;
    let randomIndex = 0;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return this.setState({ sort: array });
  }

  render() {
    const { element, current, isLoading, answer, sort, results } = this.state;
    console.log('results:', results);
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    const questionsDataARR = element.results[current];
    const correctQuestion = questionsDataARR.correct_answer;
    const questions = [...questionsDataARR.incorrect_answers, correctQuestion];
    const correctAnswer = (item, index) => (
      <button
        key={ `btn${index}` }
        id={ `order-${sort[index]}` }
        type="button"
        className={ `${answer ? 'correct' : null}` }
        onClick={ (event) => this.handleClickAnswer(event) }
        data-testid="correct-answer"
      >
        {item}
      </button>
    );
    const wrongAnswer = (item, index) => (
      <button
        key={ `btn${index}` }
        id={ `order-${sort[index]}` }
        type="button"
        className={ ` ${answer ? 'incorrect' : null}` }
        onClick={ (event) => this.handleClickAnswer(event) }
        data-testid={ `wrong-answer-${index}` }
      >
        {item}
      </button>);
    return (
      <div className="father">
        <p data-testid="question-category">{questionsDataARR.category}</p>
        <p data-testid="question-text">{questionsDataARR.question}</p>
        {questions.map((item, index) => (
          item === questionsDataARR.correct_answer
            ? correctAnswer(item, index)
            : wrongAnswer(item, index)
        ))}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   results: state.game.results,
// });

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (result) => dispatch(addResult(result)),
});

GameContent.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GameContent);
