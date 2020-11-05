import React, { Component } from 'react';
import { Questions } from '../components';

class Game extends Component {
  render() {
    return (
      <div>
        Tela de jogo: Pergunta e respostas e botão de próxima pergunta
        <Questions />
      </div>
    );
  }
}

export default (Game);
