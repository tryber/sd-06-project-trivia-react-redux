import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, score, imagePath, assertions } = this.props;
    const three = 3;
    return (
      <header>
        {assertions < three ? <h1 data-testid="feedback-text">Podia ser melhor...</h1>
          : <h1 data-testid="feedback-text">Mandou bem!</h1>}

        <h1 data-testid="feedback-text">Feedback</h1>
        <img
          data-testid="header-profile-picture"
          alt="Player_avatar"
          src={ imagePath }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar Novamente
        </button>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  imagePath: state.player.imagePath,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
