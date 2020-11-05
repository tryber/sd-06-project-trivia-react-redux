import React from 'react';
import { connect } from 'react-redux';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: 10,
    };
  }

  componentDidMount() {
    this.fetchApi();
    console.log(this.fetchApi);
  }

  fetchApi() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(url)
      .then((response) => response.json())
      .then((a) => this.setState({ element: a }));
  }

  render() {
    const { element } = this.state;
    return (
      <div>
        <div>Categoria</div>
        <div>texto pergunta</div>
        <div>Alternativas</div>
        { console.log(element)}
      </div>
    );
  }
}

export default connect(null, null)(GameContent);
