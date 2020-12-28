import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MenuResponsive, ProfileBarResponsive, Questions } from '../components';
import './Game.css';

class Game extends Component {
  componentDidMount() {
    const { history, authenticationStatus } = this.props;
    if (!authenticationStatus) history.push('/');
  }

  render() {
    const { tokenObj: { token } } = this.props;
    return (
      <div className="game-container">
        <MenuResponsive />
        <ProfileBarResponsive />
        <div className="game-questions-container">
          { (token === 'ERROR_TOKEN') ? <p>Falha Temporária</p> : <Questions />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenObj: state.tokenObj,
  authenticationStatus: state.authenticationStatus,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  tokenObj: PropTypes.objectOf(PropTypes.string).isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
};
