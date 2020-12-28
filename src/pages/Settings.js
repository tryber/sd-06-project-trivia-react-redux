import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenuResponsive } from '../components';
import { getCategoriesAPI } from '../servicesAPI';
import './Settings.css';
import { addSettingsAction } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { settings } = this.props;
    const { difficulty, type, amount, category } = settings;
    this.state = {
      difficulty,
      category,
      amount,
      type,
      categories: [],
      isFetching: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  componentWillUnmount() {
    this.setState({ isFetching: false });
  }

  handleState() {
    const { isFetching } = this.state;
    if (!isFetching) {
      getCategoriesAPI()
        .then((r) => this.setState({ categories: r, isFetching: false }));
    }
  }

  handleClick({ target }) {
    const { name, value } = target;
    const { addSettings } = this.props;
    this.setState({ [name]: value });
    addSettings({ [name]: value });
  }

  render() {
    const { difficulty, amount, category, type, categories } = this.state;
    const { authenticationStatus } = this.props;
    return (
      <div>
        <MenuResponsive />
        <section className="settings-container">
          <div className="settings-header">
            <p data-testid="settings-title">Settings</p>
          </div>
          <form className="parameters-container">
            <label htmlFor="amount" className="parameter">
              <p className="parameter-title">Amount of Questions</p>
              <input
                min="5"
                max="50"
                type="number"
                className="parameter-options"
                name="amount"
                id="amount"
                placeholder="Insert a number"
                onChange={ this.handleClick }
                value={ amount }
              />
            </label>
            <label htmlFor="difficulty" className="parameter">
              <p className="parameter-title">Difficulty</p>
              <select
                className="parameter-options"
                name="difficulty"
                id="difficulty"
                onChange={ this.handleClick }
                value={ difficulty }
              >
                { difficulty === '' && <option>Select an option</option> }
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label htmlFor="type" className="parameter">
              <p className="parameter-title">Type</p>
              <select
                className="parameter-options"
                name="type"
                id="type"
                onChange={ this.handleClick }
                value={ type }
              >
                { type === '' && <option>Select an option</option> }
                <option value="any">Any Type</option>
                <option value="boolean">True / False</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </label>
            <label htmlFor="category" className="parameter">
              <p className="parameter-title">Category</p>
              <select
                className="parameter-options"
                name="category"
                id="category"
                onChange={ this.handleClick }
                value={ category }
              >
                { category === '' && <option>Select an option</option> }
                <option value="any">Any Category</option>
                { categories.length > 0 && categories.map((cat) => (
                  <option key={ cat.id } value={ cat.id }>{ cat.name }</option>)) }
              </select>
            </label>
          </form>
          <div className="settings-button-area">
            { authenticationStatus
              && (
                <Link to="/game">
                  <button
                    type="submit"
                  >
                    Play Now
                  </button>
                </Link>)}
            <Link to="/">
              <button
                className={ (authenticationStatus) && 'second-button' }
                type="button"
              >
                Go Home
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSettings: (e) => dispatch(addSettingsAction(e)),
});

const mapStateToProps = (state) => ({
  settings: state.settings,
  authenticationStatus: state.authenticationStatus,
});

Settings.propTypes = {
  settings: PropTypes.shape.isRequired,
  addSettings: PropTypes.func.isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
