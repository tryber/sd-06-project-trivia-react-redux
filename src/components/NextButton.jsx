import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NextButton extends Component {
  render() {
    const { updateQuestion } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ updateQuestion }
        >
          Next Question
        </button>
      </div>
    );
  }
}

export default NextButton;

NextButton.propTypes = {
  updateQuestion: PropTypes.func.isRequired,
};
