import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../actions';
import QuestionCard from '../componente/questionCards';
import Header from '../componente/Header';

class TriviaGame extends Component {
  componentDidMount() {
    const { questionCards, questionToken } = this.props;
    questionCards(questionToken);
  }

  render() {
    return (
      <section>
        <Header />
        <QuestionCard />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questionToken: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  questionCards: (token) => dispatch(getQuestion(token)),
});

TriviaGame.propTypes = {
  questionToken: propTypes.string.isRequired,
  questionCards: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
