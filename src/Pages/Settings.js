import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../Components/GenericButton';
import { getCategoriesAPI } from '../service/fetchAPI';

class Settings extends Component {
  constructor() {
    super();

    this.getCategories = this.getCategories.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      categories: [],
      hasError: false,
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    const categories = await getCategoriesAPI();
    const redirectCode = 4;
    const responseCode = parseInt(localStorage.getItem('responseCode'), 10);

    if (responseCode === redirectCode) {
      this.setState({ hasError: true });
    }

    this.setState({ categories });
  }

  handleClick() {
    const { history } = this.props;
    const number = document.getElementById('select-number').value;
    let category = document.getElementById('select-category').value;
    let typeAPI = document.getElementById('select-type').value;
    let difficulty = document.getElementById('select-difficulty').value;
    if (category === 'default') category = '';
    if (typeAPI === 'default') typeAPI = '';
    if (difficulty === 'default') difficulty = '';

    localStorage.setItem('number', number);
    localStorage.setItem('category', category);
    localStorage.setItem('typeAPI', typeAPI);
    localStorage.setItem('difficulty', difficulty);

    history.push('/');
  }

  render() {
    const { categories, hasError } = this.state;

    return (
      <div>
        <h1 data-testid="settings-title">
          Settings
        </h1>
        <section className="select-category">
          Categorias:
          <select name="select-category" id="select-category">
            <option
              id="default"
              value="default"
            >
            Todas as categorias
            </option>
            {categories.map((category) => (
              <option
                key={ category.id }
                id={ category.id }
                value={ category.id }
              >
                { category.name }
              </option>
            ))}
          </select>
        </section>
        <section className="select-type">
          Tipo de questão:
          <select name="select-type" id="select-type">
            <option
              id="default"
              value="default"
            >
              Todos os tipos
            </option>
            <option
              id="multiple"
              value="multiple"
            >
              Múltipla escolha
            </option>
            <option
              id="boolean"
              value="boolean"
            >
              Verdadeiro ou Falso
            </option>
          </select>
        </section>
        <section className="select-difficulty">
          Quantidade de questões:
          <select name="select-difficulty" id="select-difficulty">
            <option
              id="default"
              value="default"
            >
              Todas as dificuldades
            </option>
            <option
              id="easy"
              value="easy"
            >
              Fácil
            </option>
            <option
              id="medium"
              value="medium"
            >
              Média
            </option>
            <option
              id="hard"
              value="hard"
            >
              Díficil
            </option>
          </select>
        </section>
        <section className="select-number">
          Quantidade de questões:
          <select name="select-number" id="select-number">
            <option
              id="5"
              value="5"
            >
              5
            </option>
            <option
              id="10"
              value="10"
            >
              10
            </option>
            <option
              id="20"
              value="20"
            >
              20
            </option>
            <option
              id="30"
              value="30"
            >
              30
            </option>
            <option
              id="40"
              value="40"
            >
              40
            </option>
            <option
              id="50"
              value="50"
            >
              50
            </option>
          </select>
        </section>
        <GenericButton
          onClick={ this.handleClick }
          data-testid="save-settings"
          title="Salvar configurações"
        />
        {hasError ? (
          <div>
            <h3>Não há questões suficientes para a configuração selecionada!</h3>
            <h4>Favor selecionar uma nova configuração.</h4>
          </div>
        ) : null}
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
