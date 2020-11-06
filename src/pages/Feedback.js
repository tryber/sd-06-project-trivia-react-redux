import React from 'react';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <button type="button" data-testid="btn-next">Next</button>
      </div>
    );
  }
}

export default Feedback;
