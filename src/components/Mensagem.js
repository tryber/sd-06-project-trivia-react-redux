import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Mensagem extends Component {
  render() {
    const { assertions, score } = this.props;
    const TRES = 3;
    return (
      <div>
        <div>
          { assertions < TRES
            ? (
              <div
                data-testid="feedback-text"
              >
            Podia ser melhor...
              </div>
            )
            : (
              <div
                data-testid="feedback-text"
              >
                Mandou bem!
              </div>
            )}
        </div>
        <div>
          <p>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            questões.
          </p>
          <p>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
            {' '}
            pontos.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.allQuestions.score,
  assertions: state.allQuestions.assertions,
});

Mensagem.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Mensagem);
