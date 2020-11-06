import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, QuestionCard, Loading } from '../components';
import { getQuestions } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questionAnswer: false,
      question: questions[0],
    };

    this.updateState = this.updateState.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }
  
  async componentDidMount() {
    const { token, dispatchQuestions} = this.props;
    await dispatchQuestions(token);
    this.updateState();
  }
  
  updateState() {
    this.setState({
      isLoading: false,
    });
  }
  
  handleClickAnswer() {
    this.setState({
      questionAnswer: true,
    });
  }
  
  handleClickNext() {
      this.setState({
        questionAnswer: false,
      });
    }
    
    render() {
      const { questions } = this.props;
      console.log(questions);
      const { isLoading,questionAnswer, question } = this.state;
    return (
      <div>
        <Header />
        {/* {isLoading ? <Loading /> : <QuestionCard onClick={this.handleClickAnswer} currentQuestion={question}/>} */}
        { questionAnswer ?  <button
        type="button"
        data-testid="btn-next"
        onClick={this.handleClickNext}
        >
        Próxima
        </button> 
        : " "
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.game.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(getQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.array,
  dispatchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
