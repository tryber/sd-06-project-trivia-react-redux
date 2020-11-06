import React from 'react';
import { Link } from 'react-router-dom';
import questionsAPI from '../services/questionAPI';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonBorder: false,
      questions: [{
        category: '',
        question: '',
        incorrect_answers: [],
        correct_answer: '',
      }],

    };
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
  }

  componentDidMount() {
    this.questionsGet();
  }

  async questionsGet() {
    const tokenLocal = localStorage.getItem('token');
    const questionsReturn = await questionsAPI(tokenLocal);
    this.setState({
      questions: questionsReturn,
    });
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { buttonBorder, questions } = this.state;
    return (
      <div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            <p>
              {questions && questions[0] && questions[0].category}
            </p>
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            <div>
              {questions && questions[0] && questions[0].question}
            </div>
          </div>
        </div>
        <div className="gamepage-answer">
          {questions && questions[0] && questions[0].incorrect_answers.map((result, i) => (
            <div key={ result }>
              <button
                className={ !buttonBorder ? 'none-answer' : 'wrong' }
                onClick={ this.handleClick }
                data-testid={ `wrong-answer-${i}` }
                type="button"
                disabled={ buttonBorder }
              >
                {result}
              </button>
            </div>
          ))}
          <button
            className={ !buttonBorder ? 'none-answer' : 'correct' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            disabled={ buttonBorder }
          >
            {questions && questions[0] && questions[0].correct_answer}
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
