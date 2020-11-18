import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { saveSettings, fetchCategories } from '../actions';
import LoginSound from '../audio/007-login.mp3';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const { category, difficulty, type } = props;
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      category,
      difficulty,
      type,
    };
  }

  componentDidMount() {
    const { requestCategories } = this.props;
    requestCategories();
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const { options, confirm } = this.props;
    const { category, difficulty, type } = this.state;
    return (
      <div className="content-wrap">
        <ReactAudioPlayer autoPlay loop src={ LoginSound } volume={ 0.5 } />
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <label htmlFor="categories">
          <select id="category" onChange={ this.handleChange } value={ category }>
            {options.categories.map((item) => (
              <option key={ item.id } value={ item.id }>
                { item.name }
              </option>))}
          </select>
        </label>
        <label htmlFor="difficulty">
          <select id="difficulty" onChange={ this.handleChange } value={ difficulty }>
            {options.difficulty.map((item) => (
              <option key={ item.id } value={ item.id }>
                { item.name }
              </option>))}
          </select>
        </label>
        <label htmlFor="type">
          <select id="type" onChange={ this.handleChange } value={ type }>
            {options.type.map((item) => (
              <option key={ item.id } value={ item.id }>
                { item.name }
              </option>))}
          </select>
        </label>
        <div className="buttons_settings">
          <button className="bt_margin" type="button" onClick={ () => confirm(category, difficulty, type) }>
          Confirmar
          </button>
          <Link to="/"><button type="button">Voltar</button></Link>
        </div>
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
  requestCategories: () => dispatch(fetchCategories()),
  confirm: (category, difficulty, type) => (
    dispatch(saveSettings(category, difficulty, type))),
});

Settings.propTypes = {
  options: PropTypes.objectOf().isRequired,
  requestCategories: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
