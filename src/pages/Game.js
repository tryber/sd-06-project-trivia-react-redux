import React, { Component } from 'react';
// import { fetchAPIQuestions } from '../services';

class Game extends Component {
  constructor(props) {
    super(props);
    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);
    this.randomizeArray = this.randomizeArray.bind(this);
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    // const { fetchAPIQuestions } = this.props;
    this.fetchAPIQuestions();
  }

  randomizeArray(array) {
    const RANDON_NUM = 0.5;
    array.sort(() => Math.random() - RANDON_NUM);
  }

  async fetchAPIQuestions() {
    const tokenStorage = localStorage.getItem('token');
    const token = JSON.parse(tokenStorage); // https://pt.stackoverflow.com/questions/191522/como-pegar-setar-pegar-objeto-no-localstorage
    const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseQuestions = await apiQuestions.json();
    const limite = 3;
    const questions = responseQuestions.results.map((el) => (
      {
        ...el, answers: [...el.incorrect_answers, el.correct_answer],
      })); // colocando um array no fim de cada 'question' para randomizar as respostas
    console.log(questions);
    if (responseQuestions.response_code === limite) {
      localStorage.removeItem('token');
      // const { history } = this.props;
      // window.alert('Tempo expirado - Faça login novamente');
      // history.push('/');
    } else {
      this.setState({ questions: responseQuestions.results, loading: false });
    }
  }

  render() {
    const { questions, loading } = this.state;

    if (loading) {
      return <h1>Carregando...</h1>;
    }
    return (
      <div>
        <p data-testid="question-category">{ questions[1].category }</p>
        <p data-testid="question-text">{ questions[1].question }</p>
      </div>
    );
  }
}

export default Game;
