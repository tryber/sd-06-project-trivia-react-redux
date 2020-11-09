import React from 'react';

class NextButton extends React.Component {
  render() {

    const { click } = this.props;

    return (
      <button 
        type="button"
        data-testid="btn-next"
        onClick={ click() }
      >
        Next Question
      </button>
    );
  }
}

export default NextButton;
