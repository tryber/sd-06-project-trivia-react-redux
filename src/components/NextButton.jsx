import React, { Component } from 'react';

export class NextButton extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          // id={ currentIdx }
          data-testid="btn-next"
          onClick={ () => window.location.reload() }
        >
          Next Question
        </button>
      </div>
    );
  }
}

export default NextButton;
