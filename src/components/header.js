import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, name, score } = this.props;
    // console.log(avatar);
    return (
      <header>
        <img alt="Player Initials" data-testid="header-profile-picture" src={ avatar } />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
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
