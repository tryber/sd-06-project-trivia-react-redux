import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div data-testid="settings-title">
        Tela de Configurações: Categoria, Dificuldade, Tipo
      </div>
    );
  }
}

export default connect(null, null)(Settings);
