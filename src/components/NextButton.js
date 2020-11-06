import React from 'react';
import propTypes from 'prop-types';

class NextButton extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsAnswer: 0,
    };
    this.windowReloadAndCountQuestions = this.windowReloadAndCountQuestions.bind(this);
  }

  windowReloadAndCountQuestions() {
    const { questionsAnswer } = this.state;
    this.setState({ questionsAnswer: questionsAnswer + 1 });
    const magic = 5;
    const { history } = this.props;
    if (questionsAnswer === magic) {
      history.push('/feedback');
    } else window.location.reload();
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.windowReloadAndCountQuestions() }
      >
        Próxima
      </button>
    );
  }
}

NextButton.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default NextButton;
