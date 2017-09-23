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
		colors: [],
		filter: ''
	};

	componentDidMount() {
		this._fetchUserColors();
		
		if(window.localStorage.userToken)
			SyncService.syncColors(this._fetchUserColors);
	}

	_filterColors = () => {
		if(!this.state.filter || !this.state.colors || this.state.colors.length == 0)
			return this.state.colors;

		let filteredColors = [];
		this.state.colors.map(color => {
			if(color.name && color.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1)
				filteredColors.push(color);
		});

		return filteredColors;
	}

	_fetchUserColors = () => {
		let that = this;
		UserService.fetchColors(UserService.local()._id)
			.then(result => {
				if(result.success && result.data)
					that.setState({colors: result.data});
			});
	};

	_handleChange = (e) => {
		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

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
  				Hey! Have you tried our <i>awesome</i> <a href="https://chrome.google.com/webstore/detail/colorbucket/giogidmnhjmlgoglafkjioigioohcckj?hl=en-US&gl=BR" target="_blank">chrome extension</a>? 
  				<span onClick={(e) => closeAction(e, true)}>close</span>
				</p>);
  	};

    return (
      <div className="home-page">
      	{homeMessage()}
      	<div className="color-list">
	        {!this.state.colors || this.state.colors.length === 0 ?
	        	<p className="empty-list">save the colors that you ♥ so you'll never lose that nice color again</p>
	        	: 
	        	<div>
	        		<div className="col-12 center-text" data-aos="fade-down">
	        			<input type="text" className="sm-input" placeholder="filter by color tag" id="filter" onChange={(e) => this._handleChange(e)} />
								<Link to="/discover" className="button sm ion-android-compass ma-10 ma-cl-v ma-cl-r">Discover Colors</Link>
	        		</div>
							<div data-aos="fade-up">
								{this._filterColors().map(color => {
									return <ColorTile key={color._id} deleteCallback={this._fetchUserColors}  {...color} />
								})}
							</div>
	        	</div>
	        }
        </div>

        <Fab addCallback={this._fetchUserColors} />
      </div>
    );
  }
}

export default Home;
