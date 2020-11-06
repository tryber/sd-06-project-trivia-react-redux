import React from 'react';

class NextButton extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     questionsAnswer: 0,
  //   };
  //   this.windowReloadAndCountQuestions = this.windowReloadAndCountQuestions.bind(this);
  // }

  // windowReloadAndCountQuestions() {
  //   const { questionsAnswer } = this.state;
  //   this.setState({ questionsAnswer: questionsAnswer + 1 });
  //   const magic = 5;
  //   const { history } = this.props;
  //   if (questionsAnswer === magic) {
  //     history.push('/feedback');
  //   } else window.location.reload();
  // }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }
}

export default NextButton;
