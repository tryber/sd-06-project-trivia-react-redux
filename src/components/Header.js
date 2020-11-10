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
    this.changeScoreboard = this.changeScoreboard.bind(this);

    const playerScore = localStorage.getItem('state');
    const score = JSON.parse(playerScore);

    this.state = {
      hash: '',
      score: score.player.score,
    };
  }

  componentDidMount() {
    this.createPlayerScore();
  }

  componentDidUpdate(prevProps) {
    const { scoreTable } = this.props;
    if (prevProps.scoreTable !== scoreTable) {
      this.changeScoreboard(scoreTable);
    }
  }

  changeScoreboard(scoreTable) {
    this.setState({ score: scoreTable });
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
    const { hash, score } = this.state;
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
          <p data-testid="header-score">{ score }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  scoreTable: state.scoreReducer.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scoreTable: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
