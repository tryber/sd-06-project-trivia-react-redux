import React from 'react';
//  import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   myTokenRequest: (e) => dispatch(tokenRequest(e)),
// });

// Login.propTypes = {
//   myTokenRequest: PropTypes.func.isRequired,
// };

export default connect(null, null)(Game);
