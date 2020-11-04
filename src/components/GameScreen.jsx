import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class GameScreen extends Component {
  constructor() {
    super();
    this.importImage = this.importImage.bind(this);
    this.state = {
      score: 0,
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.importImage();
  }

  async importImage() {
    const { email } = this.props;
    const hash = md5(email);
    console.log(hash)
    const response = await fetch(`https://www.gravatar.com/avatar/$${hash}`);
    const { url } = response;
    this.setState({
      imageUrl: url,
    });
  }

  render() {
    const { score, imageUrl } = this.state;
    const { name } = this.props;
    return (
      <div>
        <header>
          <img
            src={ imageUrl }
            data-testid="header-profile-picture"
            alt="ProfilePic"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(GameScreen);
