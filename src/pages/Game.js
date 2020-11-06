import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getQuestions } from '../actions';
import Header from '../components/header';

class Game extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //   };
  // }

  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.token);
  }

  render() {
    const { isFetching, APIQuestions } = this.props;
    return (
      <section className="game-container">
        <section className="game-header">
          <Header />
        </section>
        <section className="game-question">
          <section className="game-category">
            { isFetching
              ? <p>Carregando...</p>
              : (
                <section className="game-answers">
                  {APIQuestions[0].category}
                </section>)}
          </section>
          <section className="game-text">
            { isFetching
              ? <p>Carregando...</p>
              : (
                <section className="game-answers">
                  {APIQuestions[0].question}
                </section>)}
          </section>
        </section>
        { isFetching
          ? <p>Carregando...</p>
          : (
            <section className="game-answers">
              {APIQuestions[0].incorrect_answers.map((i) => <p key={ i }>{i}</p>)}
            </section>)}
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
