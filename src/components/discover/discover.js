import React, { Component } from 'react';
import { Link } from 'react-router';
//
import ColorService from '../../services/color.service';
import ColorList from '../color/list/color-list';

class Discover extends Component {

	state = {
		colors: []
	};

	componentDidMount() {
		this._fetchDiscoverColors();
	}

	_fetchDiscoverColors = () => {
		let that = this;
		ColorService.discover(16)
			.then(result => {
				if(result.success && result.data){
					that.setState({colors: result.data});
					window.scrollTo(0,0);
        }
			});
	};

  render() {
    return (
      <div className="home-page">
      	<div className="color-list">
	        {!this.state.colors || this.state.colors.length === 0 ?
	        	<p className="empty-list">Fetching some inspiration...</p>
	        	: 
	        	<div>
              <h5 className="center-text" data-aos="fade-down">Discover your new favorite color</h5>
							<div data-aos="fade-up">
              	<ColorList colors={this.state.colors} hidefilter={true} />
							</div>
              <div className="col-12 row center-text ma-60 ma-cl-h">
                <button className="ion-refresh" onClick={(e) => this._fetchDiscoverColors()}>load more</button>
              </div>
	        	</div>
	        }
        </div>
      </div>
    );
  }
}

export default Discover;
