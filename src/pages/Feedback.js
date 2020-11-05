import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>
        Tela de feedback:
        Quantidade de acertos e pontos da partida, opção de ver ranking e jogar novamente
      </div>
    );
  }
}

export default connect(null, null)(Feedback);
