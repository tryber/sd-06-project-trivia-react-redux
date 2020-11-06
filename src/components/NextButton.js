import React, { Component } from 'react';

class NextButton extends Component {
  render() {
    return (
      <button
        className="next"
        type="button"
        data-testid="btn-next"
      >
        <span>Proxima</span>
      </button>
    )
  }
}

export default NextButton;
