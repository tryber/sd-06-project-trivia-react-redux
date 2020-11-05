import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services';

class Game extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    const { userToken } = this.props;
    const questions = await fetchQuestions(userToken);
    this.getQuestions(questions.results);
  }

  getQuestions(questions) {
    this.setState({
      questions: [questions],
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <div className="game-container">
        {questions.map((element, index) => (
          <div className="square" key={ index }>
            <header className="profile-header">
              <img
                data-testid="header-profile-picture"
                alt="profile"
              />
              <p data-testid="header-player-name">Nome da pessoa</p>
              <p data-testid="header-score">0</p>
            </header>
            <div className="questions">
              <h3 data-testid="question-category">{element[index].category}</h3>
              <p data-testid="question-text">{element[index].question}</p>
            </div>
            <div className="answers">
              <div data-testid="correct-answer">{element[index].correct_answer}</div>
              {element[index].incorrect_answers.map((answer, key) => (
                <div key={ key } data-testid={ `wrong-answer-${key}` }>
                  {answer}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.user.token,
});

Game.propTypes = {
  userToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
