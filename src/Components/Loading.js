import React, { Component } from 'react';

import '../Css/Loading.css';

class Loading extends Component {
  render() {
    // Loading css found in http://loading.io;
    return (
      <div className="wrapper">
        <div className="lds-dual-ring" />
      </div>
    );
  }
}

export default Loading;
