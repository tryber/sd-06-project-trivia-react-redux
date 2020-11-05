import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, name, score } = this.props;
    console.log(avatar);
    return (
      <header>
        <img alt="Player Initials" data-testid="header-profile-picture" src={ avatar } />
        <h3 data-testid="header-profile-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

Header.defaultProps = {
  avatar: 'imagem',
  name: 'Player',
  score: '0',
};

Header.propTypes = {
  avatar: propTypes.string,
  name: propTypes.string,
  score: propTypes.string,
};

const mapStateToProps = (state) => ({
  avatar: state.imageProfile,
  name: state.name,
  score: state.score,
});

export default connect(mapStateToProps)(Header);
