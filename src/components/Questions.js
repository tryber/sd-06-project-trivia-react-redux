import React from 'react';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { button } = this.state;
    this.setState({
      button: !button,
    });
  }

  render() {
    const { button } = this.state;
    return (
      <div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            <br />
            <span>
              Frontend
            </span>
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            <span>
              Tiago é o melhor dev de CSS da Trybe?
            </span>
          </div>
        </div>
        <div className="gamepage-answer">
          <button
            className={ button ? 'none-answer' : 'correct-answer' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
          >
            true
          </button>
          <button
            className={ button ? 'none-answer' : 'wrong-answer' }
            onClick={ this.handleClick }
            data-testid="wrong-answer-0"
            type="button"
          >
            false
          </button>
          <Link to="/feedback">
            <button
              type="button"
            >
              PRÓXIMA
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Questions;
