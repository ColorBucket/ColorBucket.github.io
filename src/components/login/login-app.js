import React, { Component } from 'react';
//
import './login.scss';

class LoginApp extends Component {
  render() {
    return (
      <div className="row login-app">
        {this.props.children}
      </div>
    );
  }
}

export default LoginApp;
