import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchGravatar } from '../services';

class Ranking extends React.Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    this.fetchProfileImg();
  }

  fetchProfileImg() {
    const { hashGravatar } = this.props;
    fetchGravatar(hashGravatar);
  }

  render() {
    const { hashGravatar, userName, score } = this.props;
    const src = `https://www.gravatar.com/avatar/${hashGravatar}`;
    return (
      <div className="ranking-container game-container">
        <header className="profile-header ranking-header">
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <section className="table-container">
          <table>
            <thead>
              <th>
                <td>
                  <img
                    data-testid="header-profile-picture"
                    alt="profile"
                    src={ src }
                    width="120"
                    className="profile-img-feedback-ranking"
                  />
                </td>
                <hr className="hr-table" />
                <td>
                  {userName}
                </td>
                <hr className="hr-table" />
                <td className="td-score">
                  {score}
                </td>
              </th>
              <th>
                <td>
                  <img
                    data-testid="header-profile-picture"
                    alt="profile"
                    src={ src }
                    width="120"
                    className="profile-img-feedback-ranking"
                  />
                </td>
                <hr className="hr-table" />
                <td>
                  {userName}
                </td>
                <hr className="hr-table" />
                <td className="td-score">
                  {score}
                </td>
              </th>
              <th>
                <td>
                  <img
                    data-testid="header-profile-picture"
                    alt="profile"
                    src={ src }
                    width="120"
                    className="profile-img-feedback-ranking"
                  />
                </td>
                <hr className="hr-table" />
                <td>
                  {userName}
                </td>
                <hr className="hr-table" />
                <td className="td-score">
                  {score}
                </td>
              </th>
            </thead>
          </table>
        </section>
        <Link to="/">
          <button type="button" className="next home-button" data-testid="btn-go-home">
            <span>Inicio</span>
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hashGravatar: state.user.hash,
  userName: state.user.player.name,
  score: state.user.player.score,
});

Ranking.propTypes = {
  hashGravatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
