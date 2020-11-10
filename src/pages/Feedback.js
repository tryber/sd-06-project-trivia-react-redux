import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/header';

export default class Feedback extends Component {
  render() {
    return (
      <section className="feedback-container">
        <Header />
        <header data-testid="feedback-text">
          Resultado.
        </header>
        <Link to="/Ranking">
          <Button
            testId="btn-ranking"
            type="button"
            id="btnRanking"
            name="btnRanking"
            value="Ver Ranking"
          />
        </Link>
      </section>
    );
  }
}
