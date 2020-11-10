import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = (props) => {

  const Welldone = () => {
    return(
      <div className="feedback-field">
        <p data-testid="feedback-text">Mandou bem!</p>
      </div>
    )
  }
  const Getbetter = () => {
    return(
      <div data-testid="feedback-field">
        <p data-testid="feedback-text">Podia ser melhor</p>
      </div>
    )
  }

  const Feed = (props) => {
    const { asserts } = props;
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
    <div>
      Scoreboard
      <Feed />
    </div>
  )
}

Scoreboard.propTypes = {
  asserts: PropTypes.number.isRequired,
}

export default Scoreboard;