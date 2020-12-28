import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './MenuResponsive.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { updateAuthenticationAction } from '../actions';
import logo from '../trivia.png';

class MenuResponsive extends Component {
  constructor() {
    super();
    this.state = { status: 'closed', selected: '' };
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
    const { match: { path } } = this.props;
    this.setState({ selected: path });
  }

  logout() {
    const { history, updateAuthentication } = this.props;
    updateAuthentication(false);
    localStorage.setItem('authentified', false);
    localStorage.clear('state');
    history.push('/');
  }

  handleClick({ target }) {
    const { checked, type, name } = target;
    if (type === 'checkbox') {
      const status = (checked) ? 'open' : 'closed';
      this.setState({ status });
    } else {
      const { history } = this.props;
      if (name === '/') this.logout();
      this.setState({ selected: name }, () => history.push(name));
    }
  }

  render() {
    const { status, selected } = this.state;
    const { authenticationStatus } = this.props;

    let links = [
      { content: 'Game', path: '/game' },
      { content: 'Ranking', path: '/ranking' },
      { content: 'Settings', path: '/settings' },
      { content: 'Logout', path: '/' },

    ];
    if (!authenticationStatus) {
      links = [
        { content: 'Login', path: '/' },
        { content: 'Settings', path: '/settings' },
      ];
    }

    return (
      <section>
        <nav role="navigation" className={ `menu ${status}` }>
          {/* Logo */}
          <div className="logo-area">
            <img src={ logo } alt="trivia logo" />
          </div>
          {/* Icone Hamburguer do Menu */}
          <input type="checkbox" id="toggle" onClick={ this.handleClick } />
          <label htmlFor="toggle" className="menu-toggle">
            { status === 'closed'
              ? <FaBars className="menu-icon" /> : <FaTimes className="menu-icon" /> }
          </label>
          {/* Conteúdo do Menu que desce em dropdpwn */}
          <nav className="menu-content">
            { links.map((link, index) => {
              const linkClass = (link.path === selected)
                ? 'link selected' : 'link';
              return (
                <button
                  key={ index }
                  type="button"
                  className={ linkClass }
                  onClick={ this.handleClick }
                  name={ link.path }
                >
                  { link.content }
                </button>
              );
            })}
          </nav>
        </nav>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticationStatus: state.authenticationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  updateAuthentication: (e) => dispatch(updateAuthenticationAction(e)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuResponsive));

MenuResponsive.propTypes = {
  match: PropTypes.shape.isRequired,
  path: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired,
  updateAuthentication: PropTypes.func.isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
};
