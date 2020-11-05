import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../services/triviaAPI';
import { requestQuestions } from '../actions';

class Game extends React.Component {
  constructor() {
    super();

    this.handleFetch = this.handleFetch.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  async componentDidMount() {
    const NUMBER_OF_QUESTIONS = 5;
    const { receivedQuestions } = this.props;
    const questions = await this.handleFetch(NUMBER_OF_QUESTIONS);
    receivedQuestions(questions); //  populou o state
  }

  async handleFetch(num) {
    const teste = await triviaAPI(num);
    return teste;
  }

  async handleQuestions() {
    //   const { questions } = this.props;
  }

  render() {
    //  const { q uestions } = this.props;
    return (
      <div>
        <Header />
        <div id="perguntas">
          <div data-testid="question-category" />
          <div data-testid="question-text" />
        </div>
        <div id="respostas">
          <div data-testid="correct-answer" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  receivedQuestions: (e) => dispatch(requestQuestions(e)),
});

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Game.propTypes = {
  receivedQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
