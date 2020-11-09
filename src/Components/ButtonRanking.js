import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class ButtonRanking extends Component {
  render() {
    const { classProps } = this.props;
    return (
      <div className="ButtonRanking">
        <button data-testid="btn-ranking" type="button" className={ classProps }>
          <Link to="/Ranking">
            Ver Ranking
          </Link>
        </button>
      </div>
    );
  }
}

ButtonRanking.propTypes = {
  classProps: PropTypes.string,
};

ButtonRanking.defaultProps = {
  classProps: '',
};

export default ButtonRanking;
