import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonHome extends Component {
  render() {
    const { className } = this.props;
    return (
      <div>
        <Link to="/">
          <button data-testid="btn-go-home" type="button" className={ className }>
            Jogar de Novo
          </button>
        </Link>
      </div>
    );
  }
}
export default ButtonHome;

ButtonHome.propTypes = { className: PropTypes.string.isRequired };
