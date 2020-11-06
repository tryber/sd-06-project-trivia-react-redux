import React from 'react';
import { connect } from 'react-redux';
import './GameContent.css';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {},
      isLoading: true,
      current: 0,
      answer: false,
      sort: [],
    };

    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
    this.shuffle([1, 2, 1 + 2, 2 + 2]);
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    await fetch(url)
      .then((response) => response.json())
      .then((a) => this.setState({ element: a }))
      .then(() => this.setState({ isLoading: false }));
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
    const { element, current, isLoading, answer, sort } = this.state;
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
        className={ ` ${answer ? 'correct' : null}` }
        onClick={ () => this.setState({ answer: true }) }
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
        onClick={ () => this.setState({ answer: true }) }
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

export default connect(null, null)(GameContent);
