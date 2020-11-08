import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services'

class Feedback extends React.Component {
  constructor() {
    super();
    this.fetchProfileImg = this.fetchProfileImg.bind(this);
  }

  async componentDidMount() {
    this.fetchProfileImg();
  }

  fetchProfileImg() {
    const { hashGravatar } =  this.props;
    fetchGravatar(hashGravatar)
  }

  render() {
    const { hashGravatar, userName, score } =  this.props;
    const src = `https://www.gravatar.com/avatar/${hashGravatar}`
    return (
      <div className="feedback-container game-container">
        <header className="profile-header" data-testid="header-player-name">
          <div className="profile-div">
            <div className="profile-rightside">
              <img
                data-testid="header-profile-picture"
                alt="profile"
                src={ src }
                width="120"
              />
              <p data-testid="header-player-name">
                Jogador:
                <span>{ userName }</span>
              </p>
            </div>
          </div>
          <h1 className="score">
                <p data-testid="header-score">
                  Placar
                  <span>{score}</span>
                </p>
          </h1>
        </header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hashGravatar: state.user.hash,
  userName: state.user.player.name,
  score: state.user.player.score,

});


export default connect(mapStateToProps)(Feedback);
