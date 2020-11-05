import React, { Component } from 'react';
// import { fetchAPIQuestions } from '../services';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);

    this.state = {
      questions: [],
    }
  }

  fetchAPIQuestions = async () => {
    const token1 = window.localStorage.getItem('token');
    const jsonToken = JSON.parse(token1); //https://pt.stackoverflow.com/questions/191522/como-pegar-setar-pegar-objeto-no-localstorage
    console.log(jsonToken)
    const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${jsonToken}`);
    const responseQuestions = await apiQuestions.json();
    const limite = 3;
    if (responseQuestions.response_code === limite) {
      // const { history } = this.props;
      localStorage.removeItem('token');
      // window.alert('Tempo expirado - Faça login novamente');
      // history.push('/');
    } else {
      this.setState({ questions: responseQuestions.results });
    }
  }

  componentDidMount() {
    // const { fetchAPIQuestions } = this.props;
    this.fetchAPIQuestions();
    console.log(this.state)
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ questions.category }</p>
        <p data-testid="question-text">{ questions.question }</p>
      </div>
    );
  }
}

export default Game;
