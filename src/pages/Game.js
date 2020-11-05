import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placar: 0,
    };
  }

  render() {
    const { placar } = this.state;
    const { name, email } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    return (
      <div>
        <header className="container-header">
          <div>
            <img
              data-testid="header-profile-picture"
              alt="imagem"
              src={ gravatarLink + emailMD5 }
            />
          </div>
          <div data-testid="header-player-name">{ name }</div>
          <div data-testid="header-score">
            Placar:
            { placar }
          </div>
        </header>
        <div className="container-game">
          <div>Pergunta</div>
          <div>Respostas</div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   currencyFetch: () => dispatch(currenciesThunk()),
//   expensesAction: (expenses) => dispatch(fetchExchangeRates(expenses)),
// });
// const mapDispatchToProps = (dispatch) => ({
//   sendFields: (name, email) => dispatch(enterUser(name, email)),
// });

export default connect(mapStateToProps)(Game);
