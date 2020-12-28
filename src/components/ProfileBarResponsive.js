import React, { Component } from 'react';
import './ProfileBarResponsive.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gravatarAPI } from '../servicesAPI';

class ProfileBarResponsive extends Component {
  constructor() {
    super();
    this.state = { status: 'closed' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { checked } = target;
    this.setState({ status: (checked) ? 'open' : 'closed' });
  }

  render() {
    const { gravatarEmail, name, score } = this.props;
    const { status } = this.state;
    return (
      <section className={ `profile-bar ${status}` }>
        <div className="user-infos">
          <img
            alt="user avatar"
            data-testid="header-profile-picture"
            src={ gravatarAPI(gravatarEmail) }
          />
          <p data-test-id="input-player-name" hidden>{ gravatarEmail }</p>
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <div className="score">
          Score:
          <span data-testid="header-score">{ score }</span>
        </div>
        <input
          type="checkbox"
          id="toggle-profile-bar"
          onClick={ this.handleClick }
        />
        <label htmlFor="toggle-profile-bar">
          { status === 'closed' ? <FaChevronDown /> : <FaChevronUp /> }
        </label>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(ProfileBarResponsive);

ProfileBarResponsive.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
