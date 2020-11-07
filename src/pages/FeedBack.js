import React from 'react';
import FeedHeader from '../components/FeedHeader';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <FeedHeader />
        <p data-testid="feedback-text">FeedBack</p>
      </div>

    );
  }
}

export default FeedBack;
