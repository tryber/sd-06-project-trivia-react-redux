import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <h1 data-testid="feedback-text">
      Feedback
        </h1>
        <h2>{state.player.score}</h2>
        <Header />
      </>
    );
  }
}

export default Feedback;
