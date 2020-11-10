import React from 'react';
import PropTypes from 'prop-types';
import questionsAPI from '../services/questionAPI';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonBorder: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
  }

  componentDidMount() {
    this.questionsGet();
    const timer = 30000;
    this.questionsGet();
    setTimeout(() => this.handleClick(), timer);
  }

  async questionsGet() {
    const tokenLocal = localStorage.getItem('token');
    await questionsAPI(tokenLocal);
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { buttonBorder } = this.state;
    const { questionAtual } = this.props;
    // const testeObjectQuestion = Object.assign(questionAtual);
    console.log('question atual no componente Questions:', questionAtual);
    return (
      <div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            {questionAtual && questionAtual.category}
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            {questionAtual && questionAtual.question}
          </div>
        </div>
        <div className="gamepage-answer">
          {questionAtual && questionAtual.incorrect_answers
            .map((result, i) => (
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
            {questionAtual && questionAtual.correct_answer}
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questionAtual: PropTypes.arrayOf(Object).isRequired,
};

export default Questions;
