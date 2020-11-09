import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiSave, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      amount: 5,
      difficulty: '',
      type: '',
      category: '',
    };
  }

  render() {
    return (
      <div className="settings-page">
        <Link to="/">
          <FiArrowLeft size={ 20 } />
            Voltar
        </Link>

        <form>
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
            />
          </div>

          <div className="select-group">
            <label htmlFor="difficulty">Dificuldade</label>
            <div className="select-container">

              <select name="difficulty" id="difficulty">
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

              <select name="type" id="type">
                <option value="">Aleatório</option>
                <option value="multiple">Múltipla Escolha</option>
                <option value="boolean">Verdadeiro/Falso</option>
              </select>
            </div>
          </div>

          <div className="select-group">
            <label htmlFor="category">Categoria</label>
            <div className="select-container">

              <select name="category" id="category">
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

export default Settings;
