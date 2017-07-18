import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
//
import './app.scss';
//

class App extends Component {
  render() {
    return (
      <div className="row full-width pd-cl-h">
        <Topbar />
        <div className="row col-12 app-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
