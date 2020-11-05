import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      first: {},
      second: {},
      third: {},
      fourth: {},
      fifth: {},
    };
  }

  componentDidMount() {
    const { info, questions } = this.props;
    localStorage.setItem('token', info.token);
    questions(info.token);
    // this.setState({
    //   first: results[0],
    //   second: results[1],
    //   third: results[2],
    //   fourth: results[3],
    //   fifth: results[4],
    // });
  }

  render() {
    // const { apiQuestions, questionAction } = this.props;
    // console.log(apiQuestions, questionAction);
    return (
      <section className="game-container">
        <section className="game-header">
          <Header />
        </section>
        <section className="game-question">
          <section className="game-category">categoria</section>
          <section className="game-text">texto da pergunta</section>
        </section>
        {/* <section className="game-answers">{results[0].category}</section> */}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  apiQuestions: state.allQuestions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(getQuestions(token)),
  // questionAction: () => dispatch(getQuestionsAction()),
});

Game.propTypes = {
  info: PropTypes.shape().isRequired,
  questions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
