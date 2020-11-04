import React from 'react';
//  import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">
        settings
        </h1>
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

export default connect(null, null)(Settings);
