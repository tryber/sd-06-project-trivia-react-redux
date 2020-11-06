import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';


class Header extends React.Component {
  render() {
    const { nome, email } = this.props;
    // referência: thread Isabella Joviano - 05/11/20
    const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`
    return (
        <header>
          <img
            data-testid="header-profile-picture"
            src={avatar}
            alt=""
          />
          <p data-testid="header-player-name">{nome}</p>
          <p>Placar:</p>
          <span data-testid="header-score">0</span>
        </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
