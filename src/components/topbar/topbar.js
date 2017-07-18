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
		        <div className="col-3 main-nav">
		          <span className="ion-navicon" onClick={this._toggleResponsive}></span>
		        </div>
		        <div className="col-6 center-text logo">
		          <Link to='/' className="navbar-brand">WelcomeApp</Link>
		        </div>
		        <div className="col-3 context-menu">
		        	{/* Search */}
		        	<div>
			          <span onClick={this._toggleSearch} className="ion-ios-search"></span>

			          <form className={this.state.searchOpened ? "full-search active" : "full-search"} onSubmit={this._search}>
			            <button type="submit" className="btn search-button"><i className="fa fa-search"></i></button>
			            <input type="text" id="searchInput" className="lg clear" placeholder="search" ref="search"/>

			            <span onClick={this._toggleSearch} className="close-btn ion-close-round center-text" data-dismiss="sucessModal">close</span>
			          </form>
			        </div>

				    {/* Menu */}
					<div className={this.state.menuOpened ? "hiddenMenu full active" : "hiddenMenu full"}>
						<small className="title" onClick={this._toggleResponsive}>x close</small>
						<ul>
							<li className="title">App</li>
							<li onClick={this._toggleResponsive}>
								<Link to="/" className="ion-ios-home-outline">Home</Link>
							</li>
							<li onClick={this._toggleResponsive}>
								<Link to="/about" className="ion-ios-help-outline">About</Link>
							</li>

							<li className="title pd-10 pd-cl-h pd-cl-b">You</li>
								<li onClick={this._toggleResponsive}>
								<Link to="/profile" className="ion-ios-person">My Info</Link>
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