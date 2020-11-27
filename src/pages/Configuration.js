import React, { Component } from 'react';
import { apiCategory } from '../services/request';

class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async categories() {
    const categories1 = await apiCategory();
    return categories1;
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">
          Configuration
        </h1>
        <label>
          Categoria:
          <select>
            {categories2
              .map(({ id, name }) => <option key={ id }value={ id }>{ name }</option>)}
          </select>
        </label>
        <label>
          Dificuldade:
          <select>
            <option></option>
          </select>
        </label>
        <label>
          Tipo:
          <select>
            <option></option>
          </select>
        </label>
      </div>
    );
  }
}

export default Configuration;
