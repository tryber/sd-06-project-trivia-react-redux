import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placar: 0,
    };
  }

  componentDidMount() {
    const { questionFetch } = this.props;
    questionFetch();
  }

  render() {
    const { placar } = this.state;
    const { name, email, results } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);

    console.log(results !== '' ? results[0].category : 0);

    return (
      <div>
        <header className="container-header">
          <div>
            <img
              data-testid="header-profile-picture"
              alt="imagem"
              src={ gravatarLink + emailMD5 }
            />
          </div>
          <div data-testid="header-player-name">{ name }</div>
          <div data-testid="header-score">
            Placar:
            { placar }
          </div>
        </header>
        <div className="container-game">
          <div>
            <div data-testid="question-category">
              { results !== '' ? results[0].category : 0 }
            </div>
            <div data-testid="question-text">
              { results !== '' ? results[0].question : 0 }
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-success btn-block mt-4"
              data-testid="correct-answer"
            >
              { results !== '' ? results[0].correct_answer : 0 }
            </button>
            { results !== '' ? results[0].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                className="btn btn-success btn-block mt-4"
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>
            ))
              : 0 }
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.email,
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
