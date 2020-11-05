import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        Tela de ranking: Nome e pontuação dos jogadores
      </div>
    );
  }
}

export default connect(null, null)(Ranking);
