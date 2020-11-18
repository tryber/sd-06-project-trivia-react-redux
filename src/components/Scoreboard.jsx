import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';
import youwin from './youwin.gif'
import gameover from './gameover.png'

const Scoreboard = (props) => {
  const { asserts, score } = props;

  const ScoreTable = () => {
    return(
      <span className="score-table">
        <span className="score-info">
        Your Score: 
        <span data-testid="feedback-total-score"> { score } </span>
        </span>
        <span className="score-info">
        Assertions:
        <span data-testid="feedback-total-question"> { asserts } </span>
        </span>
      </span>
    )
  }

  const Welldone = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Mandou bem!</p>
        <div>
          <ScoreTable />
          <img className="baner" src={youwin}/>
        </div>
      </div>
    )
  }
  const Getbetter = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Podia ser melhor...</p>
        <div className="score-field">
          <ScoreTable />
          <img className="baner" src={gameover}/>
        </div>
      </div>
    )
  }

  const Feed = () => {
    
    if (asserts >= 3) {
      return (
        <Welldone />
      )
    } else {
      return (
        <Getbetter />
      )
    }
  }

  return(
    <div className="board">
      <Feed />
    </div>
  )
}

Scoreboard.propTypes = {
  asserts: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default Scoreboard;