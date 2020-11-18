import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCategory, saveDifficulty, saveType } from '../actions';
import fetchCategories from '../services/fetchCategories';
import triviaLogo from '../visual_identity/logo/trivia_logo_noBg2.png';
import './style_sheets/Settings.scss';

class Settings extends Component {
  constructor() {
    super();

    this.saveCategoriesToState = this.saveCategoriesToState.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.extractCategoryId = this.extractCategoryId.bind(this);

    this.state = {
      categories: [],
      difficulties: ['Easy', 'Medium', 'Hard'],
      types: ['Multiple Choice', 'True / False'],
      choosenCategory: '',
      choosenDifficulty: '',
      choosenType: '',
      hasSaved: false,
    };
  }

  async componentDidMount() {
    const API_RESPONSE = await fetchCategories();
    this.saveCategoriesToState(API_RESPONSE.trivia_categories);
  }

  saveCategoriesToState(categories) {
    this.setState({ categories });
  }

  handleSelect({ nativeEvent }) {
    const { selectedIndex } = nativeEvent.target.options;
    const key = nativeEvent.target.name;
    const selected = nativeEvent.target.options[selectedIndex].outerText;
    const composedKey = `choosen${key}`;

    let treatedSelect = '';

    if (key === 'Category') {
      treatedSelect = this.extractCategoryId(selected);
    } else if (key === 'Difficulty') {
      treatedSelect = selected.toLowerCase();
    } else if (key === 'Type') {
      if (selected === 'Multiple Choice') {
        treatedSelect = 'multiple';
      } else if (selected === 'True / False') {
        treatedSelect = 'boolean';
      }
    }
    this.setState({ [composedKey]: treatedSelect });
  }

  extractCategoryId(categoryName) {
    const { categories } = this.state;
    const categoryId = categories.find((category) => category.name === categoryName).id;
    return categoryId;
  }

  handleButtonClick() {
    const { choosenCategory, choosenDifficulty, choosenType } = this.state;
    const {
      dispatchSaveCategories,
      dispatchSaveDifficulty,
      dispatchSaveType,
    } = this.props;

    const API_CATEGORY = `&category=${choosenCategory}`;
    const API_DIFFICULTY = `&difficulty=${choosenDifficulty}`;
    const API_TYPE = `&type=${choosenType}`;

    dispatchSaveCategories(API_CATEGORY);
    dispatchSaveDifficulty(API_DIFFICULTY);
    dispatchSaveType(API_TYPE);
    this.setState({ hasSaved: true });
  }

  render() {
    const { categories, difficulties, types, hasSaved } = this.state;
    return (
      <div className="default-page">
        <header>
          <img src={ triviaLogo } alt="Trivia Logo" className="logo" />
          <h1 data-testid="settings-title">Settings</h1>
        </header>

        <main className="settings-container flex-center-column">
          <select name="Category" onChange={ this.handleSelect }>
            <option selected disabled>Choose a category</option>
            { categories.map((category) => (
              <option
                id={ category.id }
                key={ category.id }
              >
                {category.name}
              </option>))}
          </select>

          <select name="Difficulty" onChange={ this.handleSelect }>
            <option selected disabled>Choose a difficulty</option>
            { difficulties.map((difficulty) => (
              <option
                id={ difficulty }
                key={ difficulty }
              >
                {difficulty}
              </option>))}
          </select>

          <select name="Type" onChange={ this.handleSelect }>
            <option selected disabled>Choose a type</option>
            { types.map((type) => (
              <option
                id={ type }
                key={ type }
              >
                {type}
              </option>))}
          </select>

          <button
            type="button"
            className="btnDarkBlue"
            onClick={ this.handleButtonClick }
          >
            Save!
          </button>
          {hasSaved
            ? <div className="feedback-message">
              Settings saved succesfully!
              <br />
              <Link to="/">Back to game</Link>
            </div>
            : null}
        </main>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatchSaveCategories: PropTypes.func.isRequired,
  dispatchSaveDifficulty: PropTypes.func.isRequired,
  dispatchSaveType: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveCategories: (category) => dispatch(saveCategory(category)),
  dispatchSaveDifficulty: (difficulty) => dispatch(saveDifficulty(difficulty)),
  dispatchSaveType: (type) => dispatch(saveType(type)),
});

export default connect(null, mapDispatchToProps)(Settings);
