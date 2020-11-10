import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Gamepage extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      disableButton: false,
    };
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const timingDisable = 3000;
    setTimeout(() => {
      this.setState({
        disableButton: true,
      });
    }, timingDisable);
  }

  changePage() {
    console.log('next page');
    const { history } = this.props;
    history.push('/feedback');
  }

  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.changePage();
    } else {
      this.setState((state) => (
        { questionIndex: (state.questionIndex + 1) % questions.length }
      ));
    }
  }

  render() {
    const { email, username, questions } = this.props;
    // console.log('questions do Redux:', questions);
    const { questionIndex, disableButton } = this.state;
    // console.log('index render:', questionIndex);
    const questionAtual = questions[questionIndex];
    const hash = md5(email);
    return (
      <div className="gamepage-container">
        <header className="gamepage-header">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="gravatar"
            data-testid="header-profile-picture"
            className="img-logo"
          />
          <p
            data-testid="header-player-name"
          >
            {username}
          </p>
          <span
            data-testid="header-score"
          >
            Placar: 0
          </span>
        </header>
        <Questions questionAtual={ questionAtual } />
        { disableButton && (
          <button
            data-testId="btn-next"
            type="button"
            onClick={ () => this.changeQuestion() }
          >
            PRÓXIMA
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  username: state.login.username,
  questions: state.question.questions,
});

export default connect(mapStateToProps)(Gamepage);

Gamepage.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
}.isRequired;
