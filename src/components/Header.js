import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.getAvatar = this.getAvatar.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  getAvatar() {
    const { email } = this.props;
    const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return avatar;
  }

  calculateScore() {
    const { questions } = this.props;
    const score = questions.map((question) => (
      console.log(question)
    ));
    return score;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.getAvatar() }
            alt="Imagem gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <span data-testid="header-score">
            { this.calculateScore().length === 0
              ? 0
              : this.calculateScore().reduce((sum, item) => (
                sum + item
              ), 0)}
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  questions: state.game.questions,
});

Header.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
