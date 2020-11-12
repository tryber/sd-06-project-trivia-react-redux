import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, name, score } = this.props;
    return (
      <header className="header-container">
        <section className="header-info">
          <img
            className="header-image"
            alt="Player Initials"
            data-testid="header-profile-picture"
            src={ avatar }
          />
          <h3 className="header-name" data-testid="header-player-name">{ name }</h3>
        </section>
        <section>
          <h4>Pontos:
            <p className="header-score" data-testid="header-score">{ score }</p>
          </h4>
        </section>
      </header>
    );
  }
}

Header.defaultProps = {
  avatar: 'imagem',
  name: 'Player',
  score: 0,
};

Header.propTypes = {
  avatar: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
};

function mapStateToProps(state) {
  return {
    avatar: state.login.imageProfile,
    name: state.login.name,
    score: state.allQuestions.score,
  };
}

export default connect(mapStateToProps)(Header);
