import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';

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
			return alert('Please provide your name!');

		if(!this.state.username)
			return alert('Please provide your username!');

		if(!this.state.password || this.state.password.length < 6)
			return alert('Password must be longer than 6 characters!');

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	if(!re.test(this.state.email))
  		return alert('Invalid email!');

		AuthService.signup(this.state)
			.then((response) => {
				if(!response.success)
					return alert(response.data.message);

				localStorage.userToken = response.data.token;
				localStorage.user = JSON.stringify(response.data.user);
				hashHistory.push('/');
			});
	};

	_handleChange = (e) => {
		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	render() {
		return (
			<div className="ma-40 ma-cl-h">
				<form className="col-6 col-offset-3 row">
					<div className="center-text login-header">
						<Link to="/" className="bucket-logo"><img src="/images/logo.png" alt="Colorbucket logo" /></Link>
						<h3>save the colors that you ♥</h3>
					</div>

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
				</form>
			</div>
		);
	}
}

export default Signup;