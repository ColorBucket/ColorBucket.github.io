import React, { Component } from 'react';
//

class LoginApp extends Component {
  render() {
    return (
      <div className="container container-lg">
        <div className="row col-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LoginApp;
