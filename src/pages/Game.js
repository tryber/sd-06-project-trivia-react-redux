import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../actions';

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

  async componentDidMount() {
    const { info, questions, results } = this.props;
    localStorage.setItem('token', info.token);
    await questions(info.token);
    console.log(results);
    // this.setState({
    //   first: results[0],
    //   second: results[1],
    //   third: results[2],
    //   fourth: results[3],
    //   fifth: results[4],
    // });
  }

  render() {
    // const { results } = this.props;
    // console.log(results);
    return (
      <section className="game-container">
        <section className="game-header">
          {/* <Header /> */}
        </section>
        <section className="game-question">
          <section className="game-category">categoria</section>
          <section className="game-text">texto da pergunta</section>
        </section>
        <section className="game-answers">aqui vem o map dos buttons</section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  results: state.allQuestions.results,
});

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(getQuestions(token)),
});

Game.propTypes = {
  info: PropTypes.shape().isRequired,
  questions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
