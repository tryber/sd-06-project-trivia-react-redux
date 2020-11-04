import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends React.Component {
  render() {
    const { nomeDoExemploIcaro } = this.props;
    return <div>{ nomeDoExemploIcaro }</div>;
  }
}

const mapStateToProps = (state) => ({
  nomeDoExemploIcaro: state.questions.helloWorld,
});

Questions.propTypes = {
  nomeDoExemploIcaro: PropTypes.shape.isRequired,
};

export default connect(
  mapStateToProps,
)(Questions);
