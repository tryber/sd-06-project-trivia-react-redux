import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currentID: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { currentID } = this.state;
    const questionNumber = 4;
    if (currentID >= questionNumber) return;
    this.setState((prevState) => ({
      currentID: prevState.currentID + 1,
    }));
  }

  render() {
    const { currentID } = this.state;
    const { questionsInfo } = this.props;
    const currentCard = questionsInfo[currentID];
    if (!currentCard) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <GameCard question={ currentCard } nextQuestion={ this.nextQuestion } />
        <br />
      </div>
    );
  }
}

Game.propTypes = {
  questionsInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questionsInfo: state.playerInfoReducer.questionsInfo,
});

export default connect(mapStateToProps)(Game);
