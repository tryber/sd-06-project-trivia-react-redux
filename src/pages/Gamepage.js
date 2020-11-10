import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';
// import CountdownTimer from '../components/CountdownTimer';

class Gamepage extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  changeQuestion() {
    console.log('change question:', 'Hello');
  }

  render() {
    const { email, username, questions } = this.props;
    console.log('questions do Redux:', questions);
    const { questionIndex } = this.state;
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
          {/* <CountdownTimer /> */}
          
    
        </header>
        <Questions questionAtual={ questionAtual } />
        <button
          type="button"
          onClick={ this.changeQuestion() }
        >
          PRÓXIMA
        </button>
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
