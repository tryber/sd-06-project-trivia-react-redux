import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import questionsAPI from '../services/questionAPI';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonBorder: false,
    };
    this.handleClick = this.handleClick.bind(this);
    // this.questionsGet = this.questionsGet.bind(this);
  }

  // componentDidMount() {
  //   this.questionsGet();
  // }

  // async questionsGet() {
  //   const tokenLocal = localStorage.getItem('token');
  //   const questionsReturn = await questionsAPI(tokenLocal);
  //   this.setState({
  //     questions: questionsReturn,
  //   });
  // }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { questions } = this.props;
    console.log(questions[0]);
    const { buttonBorder } = this.state;
    return (
      <div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            {/* {questions[0]
              .map((result) => (
                <div>
                  {result.category}
                </div>
              ))} */}
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            <div>
              {/* {questions && questions[0] && questions[0]
                .map((result) => (
                  <div key={ result }>
                    {result.question}
                  </div>
                ))} */}
            </div>
          </div>
        </div>
        <div className="gamepage-answer">
          {/* {questions && questions[0] && questions[0].incorrect_answers
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
            ))} */}
          <button
            className={ !buttonBorder ? 'none-answer' : 'correct' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            disabled={ buttonBorder }
          >
            {/* {questions && questions[0] && questions[0].correct_answer
              .map((result) => (
                <div key={ result }>
                  {result.correct_answer}
                </div>
              ))} */}
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
