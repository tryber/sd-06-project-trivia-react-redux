import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            {/* {questions && questions.map((result) => ( */}
            {/* <div>
                  // {questions[0].category}
                </div> */}
            {/* ))} */}
            {questions && questions[0] && questions[0].category}
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            {questions && questions[0] && questions[0].question}
          </div>
        </div>
        <div className="gamepage-answer">
          {questions && questions[0] && questions[0].incorrect_answers
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
const mapStateToProps = (state) => ({
  questions: state.question.questions,
});
export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};
