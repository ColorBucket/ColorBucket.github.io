import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import './topbar.scss';

class Topbar extends Component {
	state = {
		searchOpened: false,
		menuOpened: false
	};

	_logout = () => {
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
								<Link to="/" className="ion-ios-home-outline">Home</Link>
							</li>
							<li onClick={this._toggleResponsive}>
								<Link to="/about" className="ion-ios-help-outline">About</Link>
							</li>
							<li onClick={this._toggleResponsive}>
								<Link to="/profile" className="ion-ios-person">My Profile</Link>
							</li>
							<li onClick={this._toggleResponsive}>
								<a href="https://github.com/ColorBucket/" target="_blank" className="ion-social-github">Github</a>
							</li>
							<li>
								<a href="" className="ion-log-out" onClick={this._logout} >Logout</a>
							</li>
						</ul>
					</div>
        </div>
    	</header>
		)
	}
}

export default Topbar;