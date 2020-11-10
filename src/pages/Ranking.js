import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const players = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        <div>
          { players.map((info, index) => (
            <div key={ index }>
              <img
                src={ info.picture }
                alt="Avatar"
              />
              <p data-testid={ `player-name-${index}` }>
                Name:
                {info.name}
              </p>
              <br />
              <p data-testid={ `player-score-${index}` }>
                Score:
                {info.score}
              </p>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          HOME
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(null, null)(Ranking);
