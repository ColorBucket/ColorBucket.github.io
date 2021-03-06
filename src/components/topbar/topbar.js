import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import UserService from '../../services/user.service';
import './topbar.scss';

class Topbar extends Component {
	state = {
		searchOpened: false,
		menuOpened: false,
		auth: false,
		user: null
	};

	componentDidMount() {
		if(window.localStorage.userToken) {
			this.setState({auth: true, user: UserService.local()});
		}
	}

	_logout = (e) => {
		e.preventDefault();
		if(this.state.auth)
			localStorage.clear();
		hashHistory.push('/login');
	};

	_toggleResponsive = () => {
		this.state.menuOpened = !this.state.menuOpened;
    this.setState(this.state);
	};

	_toggleSearch = (e) => {
		this.state.searchOpened = !this.state.searchOpened;
		this.setState(this.state);

		if(this.state.searchOpened)
			setTimeout("document.getElementById('searchInput').focus();",50);
	}

	_search = () => {};

	render() {
		return (
			<header>
        <div className="col-12 logo">
          <div className={this.state.menuOpened ? "burger open" : "burger"} onClick={this._toggleResponsive}>
          	<div className="burger__patty"></div><div className="burger__patty"></div><div className="burger__patty"></div>
        	</div>

          <Link to='/' className="navbar-brand"><img src="/images/logo.png" /></Link>

        	{/* Menu */}
					<div className={this.state.menuOpened ? "hiddenMenu active" : "hiddenMenu"}>
						<ul>
							<li onClick={this._toggleResponsive}>
								<Link to="/" className="ion-paintbucket">Your Colors</Link>
							</li>
							<li onClick={this._toggleResponsive}>
								<Link to="/discover" className="ion-android-compass">Discover Colors</Link>
							</li>
							{ !this.state.auth ? "" :
								<li onClick={this._toggleResponsive}>
									<Link to={"/u/"+this.state.user.username} className="ion-ios-person">Your Profile</Link>
								</li>
							}
							<li onClick={this._toggleResponsive}>
								<a href="/about" className="ion-ios-help-outline" target="_blank">About</a>
							</li>
							<li onClick={this._toggleResponsive}>
								<a href="https://chrome.google.com/webstore/detail/colorbucket/giogidmnhjmlgoglafkjioigioohcckj?hl=en-US&gl=BR" target="_blank" className="ion-social-chrome">Chrome Extension</a>
							</li>
							<li onClick={this._toggleResponsive}>
								<a href="https://github.com/ColorBucket/" target="_blank" className="ion-social-github">Github</a>
							</li>
							<li>
								{this.state.auth ? <a href="" className="ion-log-out" onClick={this._logout} >Logout</a>
								: <a href="" className="ion-log-out" onClick={(e) => this._logout(e)} >Login or Signup</a>
								}
							</li>
						</ul>
					</div>
        </div>
    	</header>
		)
	}
}

export default Topbar;