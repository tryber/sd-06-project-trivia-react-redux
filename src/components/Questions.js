import React from 'react';

class Questions extends React.Component {
  render() {
    return (
      <div>
        <div
          data-testid="question-category"
        >
          Categoria
        </div>
        <div
          data-testid="question-text"
        >
          Pergunta
        </div>
        <div>
          <button
            data-testid="correct-answer"
            type="button"
          >
            true
          </button>
          <button
            data-testid="wrong-answer-0"
            type="button"
          >
            false
          </button>
        </div>
      </div>
    );
  }
}

export default Questions;
