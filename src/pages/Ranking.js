import React from 'react';
import BtnHome from '../componente/BtnHome';

class Ranking extends React.Component {
  constructor() {
    super();
    this.sortedRanking = this.sortedRanking.bind(this);
    this.state = {
      ranking: [],
    };
  }
  componentDidMount() {
    this.sortedRanking();
  }

  sortedRanking() {
    const newRanking = JSON.parse(localStorage.getItem('ranking'));
    console.log(newRanking.sort((a, b) => b.score - a.score));
    this.setState({
      ranking: newRanking,
    })
  }


  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking list
        </h1>
        <ul>{ranking.map((position, index) =>
            <li key={index} >
              <img src={position.picture} alt="user" />
              <div data-testid={`player-name-${index}`} >{position.name}</div>
              <div data-testid={`player-score-${index}`}>{position.score}</div>
            </li>
          )}</ul>
        <section>
          <BtnHome />
        </section>
      </div>
    );
  }
}

export default Ranking;
