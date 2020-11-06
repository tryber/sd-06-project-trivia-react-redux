import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class ButtonPlayAgain extends Component {
  render() {
    const { classProps } = this.props;
    return (
      <Link to="/">
        <button data-testid="btn-play-again" type="button" className={ classProps }>
          Jogar novamente
        </button>
      </Link>
    );
  }
}

ButtonPlayAgain.propTypes = {
  classProps: PropTypes.string,
};

ButtonPlayAgain.defaultProps = {
  classProps: '',
};

export default ButtonPlayAgain;
