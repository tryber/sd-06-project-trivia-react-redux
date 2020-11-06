import React from 'react';

class NextButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => window.location.reload() }
      >
        Próxima
      </button>
    );
  }
}

export default NextButton;
