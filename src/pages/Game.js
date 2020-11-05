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
          <div>Pergunta</div>
          <div>Respostas</div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  questionFetch: PropTypes.func.isRequired,
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
