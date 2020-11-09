import React from 'react';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default Feedback;
