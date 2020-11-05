import React from 'react';
import Question from '../components/Question';
import { questionsAction } from '../actions';
import { connect } from 'react-redux';
import '../styles/Game.css';
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
    const { history, setQuestions } = this.props;
    if (questions.response_code === 3) {
      localStorage.removeItem('token');
      window.alert('Erro');
      history.push('/');
    } else {
      this.setState({ questions: questions.results },() => {
        setQuestions(this.state.questions);
      });
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    return (
     
      <div>
        <Header />
        <Question />
        <span>Começo do jogo</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (questionsArray) => dispatch(questionsAction(questionsArray))
})

export default connect(null, mapDispatchToProps)(Game);
