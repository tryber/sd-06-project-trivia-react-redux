import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../actions/actionsQuestions';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { fetchQuestion, token } = this.props;
    fetchQuestion(token);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    const { questions } = this.props;
    let newQuestions = [];
    if (questions.length > 0) {
      newQuestions = questions[0].results.map((pergunta) => {
        const { correct_answer: correct, incorrect_answers: incorrect } = pergunta;
        if (pergunta.type === 'boolean') {
          if (correct === 'True') {
            const detalhes = [
              {
                resposta: correct,
                dataTestid: 'correct-answer',
                value: 'CorrectAnswer',
              },
              {
                resposta: incorrect[0],
                dataTestid: 'wrong-answer-0',
                value: 'WrongAnswer',
              },
            ];
            return { ...pergunta, respostas: detalhes };
          }
          const detalhes = [
            {
              resposta: incorrect[0],
              dataTestid: 'wrong-answer-0',
              value: 'WrongAnswer',
            },
            {
              resposta: correct,
              dataTestid: 'correct-answer',
              value: 'CorrectAnswer',
            },
          ];
          return { ...pergunta, respostas: detalhes };
        }
        const detalhes = [
          {
            resposta: correct,
            dataTestid: 'correct-answer',
            value: 'CorrectAnswer',
          },
          {
            resposta: incorrect[0],
            dataTestid: 'wrong-answer-0',
            value: 'WrongAnswer',
          },
          {
            resposta: incorrect[1],
            dataTestid: 'wrong-answer-1',
            value: 'WrongAnswer',
          },
          {
            resposta: incorrect[2],
            dataTestid: 'wrong-answer-2',
            value: 'WrongAnswer',
          },
        ];
        const newDetalhes = this.shuffle(detalhes);
        return { ...pergunta, respostas: newDetalhes };
      });
    }

    return (
      <div>
        <Header />
        {questions.length > 0
          ? <Questions question={ newQuestions } />
          : 'Loading...' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
