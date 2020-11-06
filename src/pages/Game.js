import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getQuestions } from '../actions';
import Header from '../components/header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      // respondida: false,
      index: 0,
      desabled: false,
      // results: [],
    };

    // this.setQuestion = this.setQuestion.bind(this);
    this.handleClickButtonNext = this.handleClickButtonNext.bind(this);
  }

  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.token);
    // this.setQuestion();
  }

  // setQuestion() {
  //   const { isFetching, APIQuestions } = this.props;
  //   const { results } = this.state;
  //   return (
  //     !isFetching
  //       ? this.setState({
  //         results: [...APIQuestions],
  //       })
  //       : results
  //   );
  // }

  handleClickButtonNext() {
    this.setState(((prevState) => ({
      index: prevState.index + 1,
    })), () => {
      const { index } = this.state;
      const QUATRO = 4;
      if (index === QUATRO) {
        this.setState({ desabled: true });
      } else {
        this.setState({ desabled: false });
      }
    });
  }

  handleButton() {
    const { desabled } = this.state;
    return (
      <button
        type="button"
        onClick={ this.handleClickButtonNext }
        data-testid="btn-next"
        disabled={ desabled }
      >
        Próxima
      </button>);
  } 

  render() {
    const { isFetching, APIQuestions } = this.props;
    const { index } = this.state;
    const random = 0.5;
    return (
      <section className="game-container">
        <section className="game-header">
          <Header />
        </section>
        <section className="game-question">
          <section className="game-category">
            {isFetching
              ? <p>Carregando...</p>
              : (
                <h3 data-testid="question-category">
                  {APIQuestions[index].category}
                </h3>
              )}
          </section>
          <section className="game-text">
            { isFetching
              ? <p>Carregando...</p>
              : (
                <section data-testid="question-text">
                  {APIQuestions[index].question}
                </section>)}
          </section>
        </section>
        { isFetching
          ? <p>Carregando...</p>
          : (
            <section className="game-answers">

              {
                APIQuestions[index]
                  .incorrect_answers.concat(APIQuestions[index].correct_answer)
                  .map((question, i) => (
                    <button
                      data-testid={
                        APIQuestions[index].correct_answer === question
                          ? 'correct-answer'
                          : `wrong-answer-${i}`
                      }
                      key={ i }
                      type="button"
                    >
                      {question}
                    </button>
                  ))
                  .sort(() => Math.random() - random)
              }
            </section>
          )}
        { this.handleButton() }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  APIQuestions: state.allQuestions.results,
  isFetching: state.allQuestions.isFetching,
});

Game.propTypes = {
  info: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  APIQuestions: PropTypes.arrayOf(
    PropTypes.shape(),
    PropTypes.array,
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps)(Game);
