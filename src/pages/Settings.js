import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Settings extends Component {
  render() {
    return (
      <div>
        Tela de Configurações: Categoria, Dificuldade, Tipo
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <Link to="/"><button type="button">Voltar</button></Link>
      </div>
    );
  }
}

export default connect(null, null)(Settings);
