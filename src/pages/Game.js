import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        Tela de jogo: Pergunta e respostas e botão de próxima pergunta
      </div>
    );
  }
}

export default connect(null, null)(Game);
