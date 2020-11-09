import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.getScoreFromStorage = this.getScoreFromStorage.bind(this);

    this.state = { score: 0 };
  }

  componentDidMount() {
    this.getScoreFromStorage();
  }

  componentDidUpdate(prevProps) {
    const { score } = this.props;
    if (prevProps.score !== score) {
      this.getScoreFromStorage();
    }
  }

  async getScoreFromStorage() {
    const { player: { score } } = await JSON.parse(localStorage.getItem('state'));
    return score;
  }

  render() {
    const { getUser: { gravatarEmail, name } } = this.props;
    const score = this.getScoreFromStorage();

    return (
      <header>
        <img
          src={ gravatarEmail }
          alt="avatar"
          width="75px"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.login,
  score: state.player.score,
});

Header.propTypes = {
  getUser: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
