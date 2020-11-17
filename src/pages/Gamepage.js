import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import questionsAPI from '../services/questionAPI';
import { ScoreAndAssertionsFuncion } from '../actions';
import Header from '../components/Header';

class Gamepage extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      buttonBorder: false,
      timer30: 30,
    };

    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
  }

  // Função responsável por, na montagem do componente: 1- pegar do localStorage
  // o token, 2-chamar a função de requisição das questões com o token, 3- disparar
  // o timer de cada questão, 4- iniciar o estado geral do score e do assertions.
  async componentDidMount() {
    const { pointing } = this.props;
    const tokenLocal = localStorage.getItem('token');
    await this.questionsGet(tokenLocal);
    this.timer();
    pointing(0, 0);
  }

  // Função responsável por, na desmontagem do componente, limpar/interromper o intervalo.
  componentWillUnmount() {
    clearInterval(this.aux);
  }

  // Fazer a requisição da API de questões.
  async questionsGet(tokenLocal) {
    await questionsAPI(tokenLocal);
  }

  // Chama a função countdown a cada 1s.
  timer() {
    const miliseconds = 1000;
    this.aux = setInterval(this.countdown, miliseconds);
  }

  // Responsável por mudar pra paǵina de feedback ao final da última questão.
  changePage() {
    const { history } = this.props;
    history.push('/feedback');
  }

  // Função responsável por obter a pontuação de acordo com tempo de resposta e
  // nível de dificuldade de cada questão (somada com 10 em função da vírgula).
  scorePoint() {
    const { questionIndex, timer30 } = this.state;
    const { questions } = this.props;
    const difficultyLevel = questions[questionIndex].difficulty;
    const three = 3;
    const ten = 10;
    let levelPoint = 1;
    if (difficultyLevel === 'easy') levelPoint = 1;
    if (difficultyLevel === 'medium') levelPoint = 2;
    if (difficultyLevel === 'hard') levelPoint = three;
    const answerPoint = (ten + (timer30 * levelPoint));
    return answerPoint;
  }

  // Função responsável por fazer um comparativo entre o que a pessoa clicou com
  // a resposta certa. Verifica se está correta para contabilizar o placar e o número
  // de acertos, e por fim chama a função que atualiza o placar e o número de acertos.
  handleUniqueAnswer(event) {
    const valueTextButton = event.target.innerHTML;
    const { questionIndex } = this.state;
    const { questions, pointing, score, assertions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    const atualPoints = (valueTextButton === correctAnswer) ? this.scorePoint() : 0;
    const currentAssertions = (valueTextButton === correctAnswer)
      ? assertions + 1 : assertions + 0;
    const currentScore = score + atualPoints;
    pointing(currentScore, currentAssertions);
  }

  // Função responsável por verificar o índice da questão, por alterar a borda quando clicada,
  // setar o timer, e caso tenha chego no índice 4 (correspondente a última questão),
  // responsável por chamar a função de mudança de página.
  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.changePage();
    }
    this.setState((state) => ({
      // Lógica questionIndex retirada da aplicação de Pokedex.
      questionIndex: (state.questionIndex + 1) % questions.length,
      buttonBorder: false,
      timer30: 30,
    }));
    this.timer();
  }

  // Função responsável pela lógica do timer, e caso ele chegue em 0,
  // vai considerar a questão como errada e respondê-la (alterando a borda).
  countdown() {
    const { timer30 } = this.state;
    const { buttonBorder } = this.state;
    this.setState({
      timer30: timer30 - 1,
    });
    if (timer30 <= 0) {
      clearInterval(this.aux);
      this.setState({
        buttonBorder: !buttonBorder,
        timer30,
      });
    }
  }

  // Função responsável por manipular cada clique nas questões, alterando
  // a borda, voltando o tempo para o estado inicial e chamando a função
  // responsável pela pontuação e o número de acertos.
  handleClick(event) {
    this.handleUniqueAnswer(event);
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
    clearInterval(this.aux);
  }

  // Função responsável por deixar o botão de "próxima" inativo até que se
  // clique em alguma das alternativas, e quando isso é feito ele aparece.
  showNextButton() {
    const { buttonBorder } = this.state;
    if (buttonBorder) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.changeQuestion() }
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, buttonBorder, timer30 } = this.state;
    const questionAtual = questions[questionIndex];

    return questions && questions.length && (
      <div className="gamepage-container">
        <Header />
        <div className="timer">
          <span>
            Timer:
          </span>
          { timer30 }
        </div>
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
            { questionAtual && questionAtual.question }
          </div>
        </div>
        <div className="gamepage-answer">
          {/* Função de map responsável por percorrer o array
          de alternativas incorretas e exibi-las. */}
          { questionAtual && questionAtual.incorrect_answers
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
            id="correct"
            disabled={ buttonBorder }
          >
            { questionAtual && questionAtual.correct_answer }
          </button>
          { this.showNextButton() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  score: state.score.score,
  assertions: state.assertions.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  pointing: (score, assertions) => dispatch(ScoreAndAssertionsFuncion(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);

Gamepage.propTypes = {
  questionAtual: PropTypes.arrayOf(Object).isRequired,
  questions: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  pointing: PropTypes.func.isRequired,
}.isRequired;
