import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class GameScreen extends Component {
  constructor() {
    super();
    this.importImage = this.importImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.requestQuestions = this.requestQuestions.bind(this);
    this.setInfoPlayerStorage = this.setInfoPlayerStorage.bind(this);
    this.updateInfoPlayerStorage = this.updateInfoPlayerStorage.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.temporizer = this.temporizer.bind(this);
    this.timeHandle = this.timeHandle.bind(this);

    this.state = {
      score: 0,
      imageUrl: '',
      questions: '',
      index: 0,
      loading: true,
      timer: 30,
    };
  }

  componentDidMount() {
    this.importImage();
    this.requestQuestions();
    this.setInfoPlayerStorage();
  }

  componentDidUpdate() {
    this.updateInfoPlayerStorage();
  }

  setInfoPlayerStorage() {
    const { name: player, email } = this.props;
    const { imageUrl } = this.state;
    const playGamer = { player: {
      name: player,
      assertions: 0,
      score: 0,
      gravatarEmail: imageUrl,
    } };
    localStorage.setItem('state', JSON.stringify(playGamer));
  }

  updateInfoPlayerStorage() {
    const { score: points } = this.state;
    console.log(points);
    const statee = localStorage.getItem('state');
    const result = JSON.parse(statee);
    result.player.score = points;
    localStorage.setItem('state', JSON.stringify(result));
    console.log(result.player.score);
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
        this.temporizer();
        this.setState({
          questions: result2.results,
          loading: false,
        });
      } else {
        const resp = await fetch(`https://opentdb.com/api.php?amount=${quantity}&token=${token}`);
        const result = await resp.json();
        this.temporizer();
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
    // this.setState((state) => ({
    //   index: state.index + 1,
    // }));
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.className === 'wrong') {
        button.className += ' red';
      } else if (button.className === 'correct') {
        button.className += ' green';
        button.disabled = 'true';
      } else if (button.className === 'hidden') {
        button.className += ' show';
      }
    });
  }

  handleClickNext() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

  async handleClickCorrect() {
    // 10 + (timer * dificuldade)
    // hard: 3, medium: 2, easy: 1
    const numberPoints = 10;
    this.setState((beforeSate) => ({
      score: beforeSate.score + numberPoints,
    }));
  }

  temporizer() {
    const interval = 1000;
    setInterval(() => this.setState((state) => ({
      timer: state.timer - 1,
    })), interval);
  }

  timeHandle() {
    const { timer } = this.state;
    if (timer === 0) {
      this.handleClick();
    }
  }

  render() {
    const { score, imageUrl, questions, index, loading, timer, disabled } = this.state;
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
                className="wrong"
                key={ i }
                data-testid={ `wrong-answer-${i}` }
                onClick={ this.handleClick }
              >
                {answer}
              </button>
            ))}
            <button
              type="button"
              className="correct"
              data-testid="correct-answer"
              onClick={ () => {
                this.handleClick();
                this.handleClickCorrect();
              } }

            >
              {questions[index].correct_answer}
            </button>
            <button
              type="button"
              className="hidden"
              data-testid="btn-next"
              onClick={ this.handleClickNext }
            >
              Próxima
            </button>
            <p onChange={ this.timeHandle() }>{timer}</p>
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
