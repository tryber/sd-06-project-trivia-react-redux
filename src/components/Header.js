import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.convertEmail = this.convertEmail.bind(this);
    this.createPlayerScore = this.createPlayerScore.bind(this);

    const playerScore = localStorage.getItem('state');
    const score = JSON.parse(playerScore);

    this.state = {
      hash: '',
      player: score.player,
    };
  }

  componentDidMount() {
    this.createPlayerScore();
  }

  createPlayerScore() {
    const { email } = this.props;
    if (email !== '') this.convertEmail(email);
  }

  convertEmail(email) {
    if (email !== '') {
      const hash = md5(email).toString();
      this.setState({ hash });
    }
  }

  render() {
    const { name } = this.props;
    const { hash, player } = this.state;
    const urlImage = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className="header-container">
        <div className="header-player">
          <img
            data-testid="header-profile-picture"
            src={ urlImage }
            alt="Gravatar"
          />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <div className="header-score">
          <p data-testid="header-score">{ player.score }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
