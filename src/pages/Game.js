import React, { Component } from 'react';
import { Questions } from '../components';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        Tela de jogo: Pergunta e respostas e botão de próxima pergunta
        <Questions />
      </div>
    );
  }
}

export default (Game);
