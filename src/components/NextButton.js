import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { handleNextQuestion } = this.props;
    return (
      <button
        className="next"
        type="button"
        data-testid="btn-next"
        onClick={ handleNextQuestion }
      >
        <span>Proxima</span>
      </button>
    );
  }
}

NextButton.propTypes = { handleNextQuestion: PropTypes.func.isRequired };

export default NextButton;
