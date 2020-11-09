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

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.createPlayerScore();
  }

  // componentDidUpdate(prevProps) {
  // const { email } = this.props;
  // if (prevProps.email !== email) this.convertEmail(email);
  // }

  createPlayerScore() {
    localStorage.setItem('playerScore', 0);

    const { email } = this.props;
    if (email !== '') this.convertEmail(email);
  }

  convertEmail(email) {
    if (email !== '') {
      const hash = md5(email).toString();
      console.log(hash);
      this.setState({ hash });
    }
  }

  render() {
    const { name } = this.props;
    const playerScore = localStorage.getItem('playerScore');
    const { hash } = this.state;
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
          <p data-testid="header-score">{ `Score : ${playerScore}` }</p>
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
