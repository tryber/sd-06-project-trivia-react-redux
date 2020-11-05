import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  componentDidMount() {
    const { info } = this.props;
    localStorage.setItem('token', info.token);
  }

  render() {
    const { info } = this.props;
    const myFetch = fetch(`https://opentdb.com/api.php?amount=5&category=31&token=${info.token}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log(myFetch);
    return (
      <section className="game-container">
        <section data-testid="question-category">aqui vem a categoria da pergunta</section>
        <section data-testid="question-text">aqui vem o texto da pergunta</section>
        <section className="game-answers" />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
});

Game.propTypes = {
  info: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
