import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div>
        Tela de Configurações: Categoria, Dificuldade, Tipo
      </div>
    );
  }
}

export default connect(null, null)(Settings);
