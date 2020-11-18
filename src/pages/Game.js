import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Questions from './Questions';
import './Game.css';

class Game extends Component {
  render() {
    const { tokenObj: { token } } = this.props;
    return (
      <div className="game-container">
        <Header />
        <div className="game-questions-container">
          { (token === 'ERROR_TOKEN') ? <p>Falha Temporária</p> : <Questions />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenObj: state.tokenObj,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  tokenObj: PropTypes.objectOf(PropTypes.string).isRequired,
};
