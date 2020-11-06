import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services';
import profile from '../img/profile.png';

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

  correctAnswer() {
    const correctButton = document.querySelector('.correct-answer');
    const correctClass = correctButton.className;
    const wrongButton = document.querySelectorAll('.wrong-answer');
    const wrongClass = wrongButton.className;
    if (correctClass.includes('correct-answer') || wrongClass.includes('wrong-answer')) {
      correctButton.classList.add('correct');
      wrongButton.forEach((element) => {
        element.classList.add('wrong');
      });
    }
  }

  render() {
    const { questions } = this.state;
    return (
      <div className="game-container">
        {questions.map((element, index) => (
          <div className="square" key={ index }>
            <header className="profile-header">
              <div className="profile-div">
                <img
                  data-testid="header-profile-picture"
                  alt="profile"
                  src={ profile }
                  width="120"
                />
                <div className="profile-rightside">
                  <p data-testid="header-player-name">Nome da pessoa:</p>
                  <p data-testid="header-score">Pontuação: 0</p>
                </div>
              </div>
            </header>
            <div className="questions-answers-container">
              <div className="questions">
                <h3 data-testid="question-category">{element[index].category}</h3>
                <p data-testid="question-text">{element[index].question}</p>
              </div>
              <div className="answers">
                <button
                  type="button"
                  data-testid="correct-answer"
                  className="each-answer correct-answer"
                  onClick={ this.correctAnswer }
                >
                  {element[index].correct_answer}
                </button>
                {element[index].incorrect_answers.map((answer, key) => (
                  <button
                    type="button"
                    key={ key }
                    className="each-answer wrong-answer"
                    data-testid={ `wrong-answer-${key}` }
                    onClick={ this.correctAnswer }
                  >
                    {answer}
                  </button>
                ))}
              </div>
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
