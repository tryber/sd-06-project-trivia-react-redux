import React from 'react';
import { connect } from 'react-redux';
import './Game.css';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, score, email, assertions } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    localStorage.setItem('state', JSON
      .stringify({ player: { name, score, gravatarEmail: email, assertions } }));
    return (
      <div>
        <header className="container-header">
          <div>
            <img
              data-testid="header-profile-picture"
              alt="imagem"
              src={ gravatarLink + emailMD5 }
              className="picture"
            />
          </div>
          <div data-testid="header-player-name">
            Jogador:
            { name }
          </div>
          <div className="scoreBoard">
            Placar:
            <div data-testid="header-score">
              { score }
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  score: state.game.gameBoard.score,
  email: state.user.player.email,
  assertions: state.game.gameBoard.assertions,
});

export default connect(mapStateToProps)(Header);
