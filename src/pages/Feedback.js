import React from 'react';
import Header from '../componente/Header';

class Ranking extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">Feedbackzão</p>
      </section>
    );
  }
}

export default Ranking;
