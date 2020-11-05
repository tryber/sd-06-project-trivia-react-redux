import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Header from '../components/Header';

class Questions extends React.Component {
  render() {
    // const { nomeDoExemploIcaro } = this.props;
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Questions;

// const mapStateToProps = (state) => ({
//   nomeDoExemploIcaro: state.questions.helloWorld,
// });

// Questions.propTypes = {
//   nomeDoExemploIcaro: PropTypes.shape.isRequired,
// };

// export default connect(
//   mapStateToProps,
// )(Questions);
