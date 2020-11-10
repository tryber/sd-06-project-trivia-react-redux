import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';
import youwin from './youwin.gif'
import gameover from './gameover.png'

const Scoreboard = (props) => {
  const { asserts } = props;
  console.log('feed', asserts);

  const Welldone = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Mandou bem!</p>
        <img className="baner" src={youwin}/>
      </div>
    )
  }
  const Getbetter = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Podia ser melhor...</p>
        <img className="baner" src={gameover}/>
      </div>
    )
  }

  const Feed = () => {
    
    if (asserts > 3) {
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
}

export default Scoreboard;