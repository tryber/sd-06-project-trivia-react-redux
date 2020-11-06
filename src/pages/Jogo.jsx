import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { solicitacaoQuestoes } from '../actions';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      perguntaState: '',
    };
    this.handleClique = this.handleClique.bind(this);
  }

  componentDidMount() {
    const { dispatchPerguntas, token } = this.props;
    dispatchPerguntas(token);
  }

  handleClique() {
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
    }));
  }

  render() {
    const { perguntas } = this.props;
    const { contador } = this.state;
    console.log('perguntas no render', perguntas);
    let correctAnswer = '';
    let options = '';
    if (perguntas.length > 0 ) {
      correctAnswer = perguntas[contador].correct_answer;
      options = [...perguntas[contador].incorrect_answers, correctAnswer].sort();
    }

    return (
      <div>
        <div>
          <Header />
        </div>
        { perguntas.length > 0 ?
          <div>
            <h2 data-testid="question-category">{ `${perguntas[contador].category}` }</h2>
            <p data-testid="question-text">{ perguntas[contador].question }</p>
            {options.map((option, index) => (
              <div key={ index }>
                <button
                  type="button"
                  data-testid={ option === correctAnswer ? "correct-answer" : `wrong-answer${index}`}
                  className={ option === correctAnswer ? "correct-answer" : "wrong-answer" }
                >
                  {option}
                </button>
              </div>
            ))}
            <button type="button" onClick={ this.handleClique }>Próxima Questão</button>
          </div>
          : <span>Loading...</span>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerAPI.token,
  perguntas: state.reducerAPI.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPerguntas: (token) => dispatch(solicitacaoQuestoes(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
