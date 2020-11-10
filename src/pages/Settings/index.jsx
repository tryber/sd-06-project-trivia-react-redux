import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiSave, FiArrowLeft } from 'react-icons/fi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateSettings } from '../../redux/actions';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const { config: { amount, difficulty, type, category } } = this.props;

    this.state = {
      amount,
      difficulty,
      type,
      category,
    };
  }

  handleInputChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(formEvent) {
    formEvent.preventDefault();
    const { amount, difficulty, type, category } = this.state;
    const { updateConfig, history } = this.props;

    updateConfig({
      amount,
      difficulty,
      type,
      category,
    });

    history.push('/');
  }

  render() {
    const { amount, difficulty, type, category } = this.state;

    return (
      <div className="settings-page">
        <Link to="/">
          <FiArrowLeft size={ 20 } />
            Voltar
        </Link>

        <form onSubmit={ this.handleSubmit }>
          <h1>
            <FiSettings />
            <span data-testid="settings-title">Configurações</span>
          </h1>

          <div className="number-input">
            <label htmlFor="amount">Quantidade de Questões</label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step={ 1 }
              value={ amount }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </div>

          <div className="select-group">
            <label htmlFor="difficulty">Dificuldade</label>
            <div className="select-container">

              <select
                value={ difficulty }
                onChange={ ({ target }) => this.handleInputChange(target) }
                name="difficulty"
                id="difficulty"
              >
                <option value="">Aleatório</option>
                <option value="easy">Fácil</option>
                <option value="medium">Médio</option>
                <option value="hard">Difícil</option>
              </select>
            </div>
          </div>

          <div className="select-group">
            <label htmlFor="type">Tipo das Questões</label>
            <div className="select-container">

              <select
                value={ type }
                onChange={ ({ target }) => this.handleInputChange(target) }
                name="type"
                id="type"
              >
                <option value="">Aleatório</option>
                <option value="multiple">Múltipla Escolha</option>
                <option value="boolean">Verdadeiro/Falso</option>
              </select>
            </div>
          </div>

          <div className="select-group">
            <label htmlFor="category">Categoria</label>
            <div className="select-container">

              <select
                value={ category }
                onChange={ ({ target }) => this.handleInputChange(target) }
                name="category"
                id="category"
              >
                <option value="">Aleatório</option>
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
            </div>
          </div>

          <Button type="submit">
            <FiSave size={ 20 } />
            Salvar
          </Button>

        </form>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateConfig: ({ amount, type, difficulty, category }) => dispatch(
      updateSettings({ amount, type, difficulty, category }),
    ),
  };
}

function mapStateToProps(state) {
  return {
    config: state.trivia.config,
  };
}

Settings.propTypes = {
  updateConfig: PropTypes.func.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  config: PropTypes.shape({
    amount: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
