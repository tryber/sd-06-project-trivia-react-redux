import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';

const Scoreboard = (props) => {

  const Welldone = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Mandou bem!</p>
      </div>
    )
  }
  const Getbetter = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text" className="feedbackText">Podia ser melhor</p>
      </div>
    )
  }

  const Feed = (props) => {
    const { asserts } = props;
    if (asserts >= 4) {
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
      <h4 className="header">Scoreboard</h4>
      <Feed />
    </div>
  )
}

Scoreboard.propTypes = {
  asserts: PropTypes.number.isRequired,
}

export default Scoreboard;