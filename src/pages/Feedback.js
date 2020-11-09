import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FeedbackMenssage } from '../components';

class Feedback extends Component {
  render() {
    return (
      <div>
        Tela de feedback:
        <FeedbackMenssage />
      </div>
    );
  }
}

export default connect(null, null)(Feedback);
