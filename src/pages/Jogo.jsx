import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { repassaPontos } from '../actions';
import '../css/jogo.css';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      classe: false,
      contagem: 30,
      disable: false,
      nextBtnDisable: false,
      click: 0,
    };
    this.handleClique = this.handleClique.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.setContagem = this.setContagem.bind(this);
    this.vaParaFeedback = this.vaParaFeedback.bind(this);
    this.handlePlacar = this.handlePlacar.bind(this);
    this.salvarPontos = this.salvarPontos.bind(this);
  }

  componentDidMount() {
    const milisegundos = 1000;
    setInterval(this.setContagem, milisegundos);
    this.salvarPontos();
  }

  componentDidUpdate() {
    this.salvarPontos();
  }

  setContagem() {
    const { contagem } = this.state;
    if (contagem > 0) {
      this.setState((anterior) => ({
        ...anterior,
        contagem: anterior.contagem - 1,
      }));
    } else {
      this.setState({
        contagem: 0,
        disable: true,
      });
    }
  }

  vaParaFeedback() {
    const { click } = this.state;
    const { history } = this.props;
    const final = 4;
    if (click === final) {
      history.push('/feedback');
    }
  }

  handleClass({ target }) {
    const { contagem } = this.state;
    console.log(contagem);
    this.setState({
      classe: true,
      nextBtnDisable: true,
    }, () => {
      const classeBotao = target.className;
      console.log(classeBotao);
      this.handlePlacar(classeBotao);
    });
  }

  handlePlacar(escolha) {
    const { contagem, contador } = this.state;
    const { perguntas, dispatchPontos } = this.props;
    const dificuldade = perguntas[contador].difficulty;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let ptosDificuldade = 0;
    if (dificuldade === 'easy') ptosDificuldade = easy;
    if (dificuldade === 'medium') ptosDificuldade = medium;
    if (dificuldade === 'hard') ptosDificuldade = hard;
    const pontos = (10 + (contagem * ptosDificuldade));
    if (escolha === 'correct') {
      this.salvarPontos(pontos);
      dispatchPontos(pontos);
    }
  }

  salvarPontos() {
    const { nome, acertos, pontosStore, gravatarEmailStore } = this.props;
    const objPlayer = { player: {
      index: '0',
      name: nome,
      assertions: acertos,
      score: pontosStore,
      gravatarEmail: gravatarEmailStore,
    } };
    localStorage.setItem('state', JSON.stringify(objPlayer));
  }

  handleClique() {
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
      contagem: 30,
      classe: false,
      nextBtnDisable: false,
      click: prevState.click + 1,
    }));
  }

  render() {
    const { perguntas } = this.props;
    const { contador, classe, disable, contagem, nextBtnDisable } = this.state;
    let correctAnswer = '';
    let options = '';
    if (perguntas.length > 0) {
      correctAnswer = perguntas[contador].correct_answer;
      options = [...perguntas[contador].incorrect_answers, correctAnswer].sort();
    }

    return (
      <div>
        <div>
          <Header />
        </div>
        <span>{contagem}</span>
        { perguntas.length > 0 ?
          <div>
            <h2 data-testid="question-category">{ `${perguntas[contador].category}` }</h2>
            <p data-testid="question-text">{ perguntas[contador].question }</p>
            {options.map((option, index) => (
              <div key={ index }>
                <button
                  type="button"
                  data-testid={ option === correctAnswer ? 'correct-answer'
                    : `wrong-answer${index}` }
                  disabled={ disable }
                  onClick={ (event) => {
                    this.handleClass(event)}
                  }
                  className={ option === correctAnswer ? `${classe ? 'correct' : ''}`
                    : `${classe ? 'wrong' : ''}` }
                >
                  {option}
                </button>
              </div>
            ))}
            {nextBtnDisable ?
              <button
                type="button"
                onClick={ () => {
                  this.handleClique();
                  this.vaParaFeedback(); }
                }
                data-testid="btn-next"
              >
                  Próxima Questão
              </button> : null}
          </div>
          : <span>Loading...</span>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerAPI.token,
  perguntas: state.reducerAPI.questions,
  nome: state.user.name,
  acertos: state.user.assertions,
  pontosStore: state.user.score,
  gravatarEmailStore: state.user.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPontos: (pontos) => dispatch(repassaPontos(pontos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
