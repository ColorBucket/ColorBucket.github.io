import React, { Component } from 'react';
//
import Fab from '../fab/fab';
import ColorTile from '../color/tile/color-tile';
import UserService from '../../services/user.service';
import './home.scss';

class Home extends Component {

	state = {
		colors: []
	};

	componentDidMount() {
		this._fetchUserColors();		
	}

	_fetchUserColors = () => {
		let that = this;
		UserService.fetchColors()
			.then(result => {
				if(result.data)
					that.setState({colors: result.data});
			});
	};

  render() {
    return (
      <div className="home-page">
      	<div className="color-list">
	        {this.state.colors.length === 0 ?
	        	<p className="empty-list">save the colors that you ♥ so you'll never lose that nice color again</p>
	        	: 
	        	this.state.colors.map(color => {
        			return <ColorTile key={color._id} deleteCallback={this._fetchUserColors}  {...color} />
	        	})
	        }
        </div>

        <Fab addCallback={this._fetchUserColors} />
      </div>
    );
  }
}

export default Home;
