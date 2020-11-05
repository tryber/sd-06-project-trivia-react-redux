import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionCard extends Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category"></p>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
