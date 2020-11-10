import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';
import './Feedback.css';
import '../App.css';

class Feedback extends React.Component {
  // constructor() {
  //   super();
  //   this.linkClick = this.linkClick.bind(this);
  // }

  // linkClick() {
  //   const { history } = this.props;
  //   history.push('/ranking');
  // }

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
