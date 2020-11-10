import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Settings.css';
import { FaHome } from 'react-icons/fa';

export default class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      amount: '5',
      category: 'any',
      difficult: 'any',
      type: 'any',
      redirect: false,
    };

    this.stateUpdater = this.stateUpdater.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges() {
    localStorage.settings = JSON.stringify(this.state);
    this.setState({ redirect: true });
  }

  stateUpdater({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { redirect, amount, category, difficult, type } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 data-testid="settings-title" className="h1">Settings</h1>

        <Link to="/">
          <button type="button" className="btn btn-info home">
            <FaHome />
          </button>
        </Link>

        <form className="form-api">
          <h2 className="form-signin-heading">Settings Game</h2>
          <div className="flex-labels">
            <label htmlFor="amount">
              Number of Questions:
              <input
                type="number"
                name="amount"
                id="trivia_amount"
                className="form-control"
                onChange={ this.stateUpdater }
                min="1"
                max="50"
                value={ amount }
              />
            </label>

            <label htmlFor="category">
              Select Category:
              <select
                onChange={ this.stateUpdater }
                name="category"
                value={ category }
                className="form-control"
              >
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="32">Entertainment: Cartoon &amp; Animations</option>
              </select>
            </label>

            <label htmlFor="difficult">
              Select Difficulty:
              <select
                onChange={ this.stateUpdater }
                name="difficult"
                value={ difficult }
                className="form-control"
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label htmlFor="type">
              Select Type:
              <select
                onChange={ this.stateUpdater }
                value={ type }
                name="type"
                className="form-control"
              >
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </label>

            <button
              className="btn btn-lg btn-primary btn-block"
              type="button"
              onClick={ this.saveChanges }
            >
              Confirm Settings
            </button>
          </div>
        </form>
      </div>
    );
  }
}
