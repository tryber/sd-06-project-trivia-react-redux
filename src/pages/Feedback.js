import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';
import './Feedback.css';
import '../App.css';

class Feedback extends React.Component {
  constructor() {
    super();
    // this.linkClick = this.linkClick.bind(this);
    this.creatingRanking = this.creatingRanking.bind(this);
  }

  // linkClick() {
  //   const { history } = this.props;
  //   history.push('/ranking');
  // }

  componentDidMount() {
    this.creatingRanking();
  }

  creatingRanking() {
    // localStorage.clear()
    const player1 = JSON.parse(localStorage.getItem('state'));
    const currentPlayer = JSON.parse(localStorage.getItem('players'));
    localStorage.setItem('players', JSON.stringify([...currentPlayer, player1]));
  }

  render() {
    return (
      <div className="feedback-page">
        <div className="feedback-container">
          <Header />
          <div className="feedback-message">
            <MessageFeedback />
          </div>
          <button
            className="button"
            type="button"
            data-testid="btn-ranking"
            // onClick={ this.rankingClick }
          >
            <Link to="/ranking" className="text-link">
              Ver Ranking
            </Link>
          </button>
          <button
            className="button"
            type="button"
            data-testid="btn-play-again"
            // onClick={ () => this.linkClick("") }
          >
            <Link to="/" className="text-link">
              Jogar novamente
            </Link>
          </button>

        </div>
      </div>
    );
  }
}

// Feedback.propTypes = {
//   history: PropTypes.string.isRequired,
// };

export default Feedback;
