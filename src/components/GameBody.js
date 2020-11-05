import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import { thunkQuestions } from '../actions';

class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
    //this.fetchQuestions = this.fetchQuestions.bind(this);
  }
  // quando chegar nessa tela, preciso dar um loading e depois torná-lo falso, assim que chamar a api de questões.
  // componentDidMount() {
  //   this.fetchApiQuestions();
  // }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
    this.setState({
      loading: false,
    });
  }
  // <Loading/>
  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading/>
    }
    return (
      <div>
        <div>
          <section id="questions"/>
          <section id="answer"/>
        </div>
        <div>
          <time></time>
          <button
            // OnClick={ fetchApiQuestions() }
          >next</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(thunkQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);

// data-testid="question-category"
// data-testid="question-text"
// data-testid="correct-answer"
// data-testid="wrong-answer-${index}"




























