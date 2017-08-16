import React, { Component } from 'react';
//
import './login.scss';

class LoginApp extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default LoginApp;
