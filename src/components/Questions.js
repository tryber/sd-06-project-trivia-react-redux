import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions';

class Questions extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { token } = this.props;
    const { questions } = this.props;
    questions(token);
  }

  render() {
    const { question } = this.props;
    console.log(question);

    return (
      <div>
        {question.map((query, index) => (
          <div data-testid="question-category">
            <p>
              {' '}
              {query.category}
            </p>
          </div>
        ))}
      </div>
      // <div>
      //   <div data-testid="question-category">
      //     <p data-testid="question-text"> xxxxxx </p>
      //   </div>
      //   <div />
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  question: state.game.questions,
});

/* o question do mapStateToProps tem que ser importando ali com question ou outro nome diferente de questions seão da erro,
alternativa para ficar como questions é fazer toda a requisição do token na pag Game */

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(getQuestions(token)),
});

Questions.propTypes = {
  token: PropTypes.object,
  question: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
