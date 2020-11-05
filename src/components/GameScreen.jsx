import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class GameScreen extends Component {
  constructor() {
    super();
    this.importImage = this.importImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      score: 0,
      imageUrl: '',
      questions: '',
      index: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.importImage();
    this.requestQuestions();
  }

  async requestQuestions() {
    this.setState({
      loading: true,
    }, async () => {
      const token = localStorage.getItem('token');
      const quantity = 5;
      if (!token) {
        const triviaRequest = await fetch('https://opentdb.com/api_token.php?command=request');
        const triviaJson = await triviaRequest.json();
        const { token: token2 } = triviaJson;
        const resp2 = await fetch(`https://opentdb.com/api.php?amount=${quantity}&token=${token2}`);
        const result2 = await resp2.json();
        this.setState({
          questions: result2.results,
          loading: false,
        });
      } else {
        const resp = await fetch(`https://opentdb.com/api.php?amount=${quantity}&token=${token}`);
        const result = await resp.json();
        this.setState({
          questions: result.results,
          loading: false,
        });
      }
    });
  }

  async importImage() {
    const { email } = this.props;
    const hash = md5(email);
    const response = await fetch(`https://www.gravatar.com/avatar/$${hash}`);
    const { url } = response;
    this.setState({
      imageUrl: url,
    });
  }

  handleClick() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

  render() {
    const { score, imageUrl, questions, index, loading } = this.state;
    const { name } = this.props;
    return (
      <div>
        <header>
          <img
            src={ imageUrl }
            data-testid="header-profile-picture"
            alt="ProfilePic"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        {loading ? <p>Loading</p> : (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>
            {questions[index].incorrect_answers.map((answer, i) => (
              <button
                type="button"
                key={ i }
                data-testid={ `wrong-answer-${i}` }
                onClick={ this.handleClick }
              >
                {answer}
              </button>
            ))}
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ this.handleClick }

            >
              {questions[index].correct_answer}
            </button>
          </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(GameScreen);
