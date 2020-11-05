import React from 'react';
import Header from '../Components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.state = {
      questions: [],
    }
  }

  async fetchQuestions() {
    const localToken = JSON.parse(localStorage.getItem('token')).token;
    const questionsAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
    const questions = await questionsAPI.json();
    if (questions.response_code === 3) {
      const { history } = this.props;
      localStorage.removeItem('token');
      window.alert('Erro');
      history.push('/');
    } else {
      this.setState({ questions: questions.results });
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    return (
      <div>
        <Header />
        <span>Começo do jogo</span>
      </div>
    );
  }
}

export default Game;