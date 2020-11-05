import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../actions';
import QuestionCard from '../componente/questionCards';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      currentIdx: 0,
    };

  }
  componentDidMount() {
    const { questionCards, questionToken } = this.props;
    questionCards(questionToken);
  }

  render() {
    const { userName, userImage } = this.props;
    return (
      <div>
        <header>
          <img
            alt="user login"
            data-testid="header-profile-picture"
            src={ userImage }
          />
          <h3
            data-testid="header-player-name"
          >
            { userName }
          </h3>
          <h3
            data-testid="header-score"
          >
            0
          </h3>
        </header>
        <section>
          <QuestionCard />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.nome,
  userImage: state.loginReducer.image,
  questionToken: state.tokenReducer.token,
});
const mapDispatchToProps = (dispatch) => ({
  questionCards: (token) => dispatch(getQuestion(token)),
});

TriviaGame.propTypes = {
  userName: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
