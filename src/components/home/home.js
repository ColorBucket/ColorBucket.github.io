import React, { Component } from 'react';
import { Link } from 'react-router';
//
import Fab from '../fab/fab';
import ColorTile from '../color/tile/color-tile';
import UserService from '../../services/user.service';
import SyncService from '../../services/sync.service';
import './home.scss';

class Home extends Component {

	state = {
		colors: []
	};

	componentDidMount() {
		this._fetchUserColors();
		
		if(window.localStorage.userToken)
			SyncService.syncColors(this._fetchUserColors);
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

  	let homeMessage = () => {
  		var closeAction = (e, chrome) => {
  			e.target.parentElement.remove();
  			if(chrome)
  				localStorage.chromealert = !localStorage.chromealert ? 1 : 2;
  		};

  		if(this.state.colors.length === 0)
  			return false;

  		if(!localStorage.userToken)
  			return (<p className="home-message">
					Hey! You're not logged in. Make sure to <Link to="/login">login</Link> or <Link to="/login/signup">signup</Link> so you never lose your colors! 
					<span onClick={(e) => closeAction(e)}>close</span>
				</p>);

  		if(!localStorage.chromealert || localStorage.chromealert != "2")
  			return (<p className="home-message">
  				Hey! Have you tried our <i>awesome</i> <a href="https://github.com/Colorbucket/chrome-extension" target="_blank">chrome extension</a>? 
  				<span onClick={(e) => closeAction(e, true)}>close</span>
				</p>);
  	};

    return (
      <div className="home-page">
      	{homeMessage()}
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
