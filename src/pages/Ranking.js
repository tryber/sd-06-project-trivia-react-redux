import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuResponsive } from '../components';
import { gravatarAPI } from '../servicesAPI';
import './Ranking.css';

class Ranking extends React.Component {
  componentDidMount() {
    const { history, authenticationStatus } = this.props;
    if (!authenticationStatus) history.push('/');
  }

  render() {
    const { ranking, authenticationStatus } = this.props;
    return (
      <div>
        <MenuResponsive />
        <section className="ranking-container">
          <div className="ranking-header">
            <p data-testid="ranking-title">Ranking</p>
          </div>
          { ranking.length === 0 && <p>Play and be the first!</p>}
          <div className="ranking-players">
            { ranking.length !== 0 && ranking.sort((pA, pB) => pB.score - pA.score)
              .map((player, index) => {
                const { gravatarEmail, name, score } = player;
                return (
                  <div key={ index } className="player-container">
                    <div className="ranking-index-container">
                      <p className="ranking-index">{ index + 1 }</p>
                    </div>
                    <div className="user-infos">
                      <img
                        alt="user avatar"
                        data-testid="header-profile-picture"
                        src={ gravatarAPI(gravatarEmail) }
                      />
                      <p data-testid={ `player-name-${index}` }>{ name }</p>
                    </div>
                    <div className="score">
                      Score:
                      <span data-testid={ `player-score-${index}` }>{ score }</span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="ranking-button-area">
            { authenticationStatus
              && (
                <Link to="/game">
                  <button
                    type="button"
                  >
                    Play Now
                  </button>
                </Link>
              )}
            <Link to="/">
              <button
                className={ (authenticationStatus) && 'second-button' }
                type="button"
                data-testid="btn-go-home"
              >
                Go Home
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
  authenticationStatus: state.authenticationStatus,
});

Ranking.propTypes = {
  ranking: PropTypes.shape.isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Ranking);
