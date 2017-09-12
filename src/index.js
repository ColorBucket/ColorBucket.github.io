'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, Router, hashHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
//
import App from './components/app/app';
import Home from './components/home/home';
import About from './components/about/about';
import Profile from './components/profile/profile';
import ProfileEdit from './components/profile/edit';
import Discover from './components/discover/discover';
//
import Login from './components/login/login';
import Signup from './components/login/signup';
import LoginApp from './components/login/login-app';
//
import 'spookycss/css/spooky.min.css';
import 'ionicons/css/ionicons.min.css';
import './assets/styles/index.scss';

////

let checkAuth = () => {
	if(!localStorage.userToken && window.location.hash.indexOf('/login') == -1)
		hashHistory.push('/login');
};

ReactDOM.render(
	<Router history={hashHistory}>
		<Route>
			<Route path="/login" component={LoginApp}>
				<IndexRoute component={Login}/>
				<Route path="signup" component={Signup}/>
			</Route>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="u/:user_id" component={Profile}/>
				<Route path="u/edit/:user_id" component={ProfileEdit}/>
				<Route path="about" component={About}/>
				<Route path="discover" component={Discover}/>
			</Route>
		</Route>
	</Router>
	,document.getElementById('app')
);
registerServiceWorker();
