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
    console.log(info);
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
});

Game.propTypes = {
  info: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
