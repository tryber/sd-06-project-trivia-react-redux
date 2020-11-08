import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseQuestions } from '../Action/actionFetchQuestions';
import Questions from '../Components/Questions';
import Header from '../Components/Header';
import GenericButton from '../Components/GenericButton';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isLoading: true,
    };

    this.getTheFetchQuestions = this.getTheFetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getTheFetchQuestions();
  }

  async getTheFetchQuestions() {
    const { fetchQuestions } = this.props;

    await fetchQuestions();
    this.setState({ isLoading: false });
  }

  handleClick() {
    const { index } = this.state;
    const { history } = this.props;
    const finalQuestion = 4;

    return (index < finalQuestion)
      ? this.setState((prevState) => ({ index: prevState.index + 1 }))
      : history.push('/feedback');
  }

  render() {
    const { questions } = this.props;
    const { index, isLoading } = this.state;

    const finalQuestion = 4;

    return (
      <div>
        { isLoading
          ? <h2>Loading...</h2>
          : (
            <div>
              <Header />
              <Questions questionObj={ questions[index] } />
              { (index < finalQuestion)
                ? (
                  <GenericButton
                    onClick={ this.handleClick }
                    title="Próxima pergunta"
                  />)
                : (
                  <GenericButton
                    onClick={ this.handleClick }
                    title="Ver resultado!"
                  />) }
            </div>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(responseQuestions()),
});

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
