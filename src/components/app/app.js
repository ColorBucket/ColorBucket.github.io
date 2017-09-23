import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
//
import './app.scss';
//

class App extends Component {
  render() {

    AOS.init({
      once: true,
      duration: 550
    });
    
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
