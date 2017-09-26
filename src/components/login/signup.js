import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Signup extends Component {
	state = {
		email: '',
		password: '',
		name: '',
		username: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.name)
			return Notification.error('Please provide your name!');

		if(!this.state.username)
			return Notification.error('Please provide your username!');

		if(!this.state.password || this.state.password.length < 6)
			return Notification.error('Password must be longer than 6 characters!');

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	if(!re.test(this.state.email))
  		return Notification.error('Invalid email!');

		AuthService.signup(this.state)
			.then((response) => {
				if(!response.success)
					return Notification.error(response.message);

				localStorage.userToken = response.data.token;
				localStorage.user = JSON.stringify(response.data.user);
				hashHistory.push('/');
			});
	};

	_handleChange = (e) => {
		if(e.target.id === 'username')
			return this._handleUsername(e);

		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	_handleUsername = (e) => {
		var regex = /^[a-zA-Z\d\-_.,\s]+$/;
		
		if(!regex.test(e.target.value))
			e.target.value = e.target.value.substr(0, e.target.value.length -1);

		e.target.value = e.target.value.replace(' ', '-');
		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	render() {
		return (
			<div className="row">
				<div className="center-text login-header col-6 flex flex-center">
					<div>
						<Link to="/" className="bucket-logo"><img src="/images/logo.png" alt="Colorbucket logo" /></Link>
						<h3>save the colors that you ♥</h3>
					</div>
				</div>
				<form className="col-4 col-offset-1 row pd-10 pd-cl-v flex flex-center">
					<div>
						<h3>Signup</h3>
						
						<label>Your Name</label>
						<input className="full-width" onChange={(e) => this._handleChange(e)} type="text" placeholder="Name" id="name" />

						<label>Your Username</label>
						<input className="full-width" onChange={(e) => this._handleChange(e)} type="text" placeholder="@username" id="username" />

						<label>Your email</label>
						<input className="full-width" onChange={(e) => this._handleChange(e)} type="email" placeholder="Email" id="email" />

						<label>Password</label>
						<input className="full-width" onChange={(e) => this._handleChange(e)} type="password" placeholder="Password" id="password" />

						<div className="center-text">
							<input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Signup"/>
							<div className="center-text login-hit">
								Have an account? <Link to="/login">Login</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;