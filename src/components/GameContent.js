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
    };

    this.shuffle = this.shuffle.bind(this);
    this.fetchApi= this.fetchApi.bind(this);
    this.setTimeout= this.setTimeout.bind(this);
  }

  // componentDidMount() {
  //   this.fetchApi();
  // }
  
  setTimeout( this.fetchApi() , 3000);


  async fetchApi() {
    setTimeout(1000)
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((a) => this.setState({ element: a }))
      .then(() => this.setState({ isLoading: false }));
  }

  shuffle(array) {
    // const treis = 3;
    // const quatro = 4
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    const { element, current, isLoading } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    const questionsDataARR = element.results[current];
    const correctQuestion = questionsDataARR.correct_answer;
    const questions = [...questionsDataARR.incorrect_answers, correctQuestion];
    // this.shuffle(questions);
    const array = [1, 2, 1 + 2, 2 + 2];
    this.shuffle(array);

    const correctAnswer = (item, index) => (
      <button
        id={ `btn${index}` }
        type="button"
        className={ `order-${array[index]}` }
        data-testid="correct-answer"
      >
        {item}
      </button>
    );
    const wrongAnswer = (item, index) => (
      <button
        id={ `btn${index}` }
        type="button"
        className={ `order-${array[index]}` }
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
        {/* {questions.map((item, index) => (
          item === questionsDataARR.correct_answer ? 
          <button type="button" data-testid="correct-answer">{item}</button>:
          <button type="button" data-testid={ `wrong-answer-${index}` }>{item}</button>
        ))} */}
      </div>
    );
  }
}

export default connect(null, null)(GameContent);
