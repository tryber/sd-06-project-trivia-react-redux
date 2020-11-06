import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Header from '../components/Header';
import Questions from '../components/Questions';
// import NextButton from '../components/NextButton';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      // checked: false,
    };
    // this.renderNextButton = this.renderNextButton.bind(this);
  }

  // renderNextButton() {
  //   const nextButton = <NextButton />;
  //   ReactDOM.render(nextButton, document.getElementById('mae'));
  // }

  render() {
    return (
      <div>
        <Header />
        <Questions />
        {/* <NextButton /> */}
      </div>
    );
  }
}

export default Game;
