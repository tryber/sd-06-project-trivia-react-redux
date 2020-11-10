import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveSettings, getCategories } from '../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { category, difficulty, type } = props;
    this.state = {
      category,
      difficulty,
      type,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, sendSettings } = this.props;
    const { category, difficulty, type } = this.state;
    sendSettings(category, difficulty, type);
    history.push('/');
  }

  render() {
    const { options } = this.props;
    const { category, difficulty, type } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="categories">
            Category:
            <select id="category" onChange={ this.handleChange } value={ category }>
              {options.categories.map((item) => (
                <option key={ item.id } value={ item.id }>
                  { item.name }
                </option>))}
            </select>
          </label>
          <br />
          <label htmlFor="difficulty">
            Difficulty:
            <select id="difficulty" onChange={ this.handleChange } value={ difficulty }>
              {options.difficulty.map((item) => (
                <option key={ item.id } value={ item.id }>
                  { item.name }
                </option>))}
            </select>
          </label>
          <br />
          <label htmlFor="type">
            Type:
            <select id="type" onChange={ this.handleChange } value={ type }>
              {options.type.map((item) => (
                <option key={ item.id } value={ item.id }>
                  { item.name }
                </option>))}
            </select>
          </label>
          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.game.options,
  category: state.game.settings.category,
  difficulty: state.game.settings.difficulty,
  type: state.game.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(getCategories()),
  sendSettings: (category, difficulty, type) => (
    dispatch(saveSettings(category, difficulty, type))
  ),
});

Settings.propTypes = {
  options: PropTypes.objectOf(PropTypes.array).isRequired,
  loadCategories: PropTypes.func.isRequired,
  sendSettings: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
