import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      disabled: false,
      disabledNextBtn: false,
      clicked: false,
    };

    this.handleClickButtonNext = this.handleClickButtonNext.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
  }

  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.token);
  }

  handleStyle() {
    this.setState({ clicked: true });
  }

  handleButton() {
    const { clicked, disabledNextBtn } = this.state;

    if (clicked) {
      return (
        <button
          type="button"
          onClick={ this.handleClickButtonNext }
          data-testid="btn-next"
          disabled={ disabledNextBtn }
        >
          Próxima
        </button>
      );
    }
    return (
      <div />
    );
  }

  handleClickButtonNext() {
    this.setState(((prevState) => ({
      index: prevState.index + 1,
      clicked: false,
    })), () => {
      const { index } = this.state;
      // const { history } = this.props;
      const QUATRO = 4;

      if (index === QUATRO) {
        this.setState({ disabledNextBtn: true });
        // history.push('/feedback');
      } else {
        this.setState({ disabledNextBtn: false });
      }
    });
  }

  render() {
    const { isFetching, APIQuestions } = this.props;
    const { index, disabled, clicked } = this.state;
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
                  .map((question, i) => {
                    if (question === APIQuestions[index].correct_answer) {
                      return (
                        <button
                          type="button"
                          data-testid="correct-answer"
                          key={ i }
                          disabled={ disabled }
                          className={ clicked ? 'correct-answer' : null }
                          onClick={ this.handleStyle }
                        >
                          {question}
                        </button>
                      );
                    }
                    return (
                      <button
                        type="button"
                        data-testid={ `wrong-answer-${i}` }
                        key={ i }
                        disabled={ disabled }
                        className={ clicked ? 'wrong-answer' : null }
                        onClick={ this.handleStyle }
                      >
                        {question}
                      </button>
                    );
                  }).sort(() => Math.random() - random)
              }
            </section>)}
        <div>
          { this.handleButton() }
        </div>
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
