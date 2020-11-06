import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { sendScore } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    const { dispatchScore } = this.props;
    const { score } = this.state;
    dispatchScore(score);
    const mil = 1000;
    setInterval(() => this.counting(), mil);
  }

  counting() {
    const { timer } = this.state;
    const timeQuestion = 30;
    if (timer <= timeQuestion && timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      const wrongAnswer = document.querySelector(
        '[data-testid="correct-answer"]',
      );
      wrongAnswer.disabled = true;
    }
  }

  render() {
    const { email, name, score } = this.props;
    const { timer } = this.state;
    const hash = md5(email).toString();
    return (
      <div>
        <p data-testid="header-player-name">{name}</p>
        <p>{timer}</p>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imgProfile"
        />
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(sendScore(score)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.user.score,
});

Header.propTypes = {
  dispatchScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
