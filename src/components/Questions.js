import React from 'react';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonBorder: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { buttonBorder } = this.state;
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
            className={ !buttonBorder ? 'none-answer' : 'correct-answer' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            disabled={ buttonBorder }
          >
            true
          </button>
          <button
            className={ !buttonBorder ? 'none-answer' : 'wrong-answer' }
            onClick={ this.handleClick }
            data-testid="wrong-answer-0"
            type="button"
            disabled={ buttonBorder }
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
