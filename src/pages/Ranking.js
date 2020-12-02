import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleRanking = this.handleRanking.bind(this);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const one = 1;
    const sortedRanking = ranking.sort((a, b) => (
      (a.score > b.score || b.score === a.score) ? -one : 0
    ));
    this.setState({
      ranking: [...sortedRanking],
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-container game-container">
        <header className="profile-header ranking-header">
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <section className="table-container">
          <table cellSpacing="0" cellPadding="0">
            <thead className="thead">
              <tr>
                <th scope="col">Foto de Perfil</th>
                <th>Nome</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {
                ranking.map((player, index) => (
                  <tr key={ index } className="bla">
                    <td datatestid="header-profile-picture">
                      <img
                        src={ `https://www.gravatar.com/avatar/${player.hash}` }
                        alt="avatar"
                      />
                    </td>
                    {/* <hr className="hr-table" /> */}
                    <td>
                      <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                    </td>
                    {/* <hr className="hr-table" /> */}
                    <td>
                      <span
                        data-testid={ `player-score-${index}` }
                      >
                        { player.score }
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
        <Link to="/">
          <button type="button" className="next home-button" data-testid="btn-go-home">
            <span>Inicio</span>
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
