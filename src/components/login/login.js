import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';

class Login extends Component {
	state = {
		email: '',
		password: '',
		name: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.email || !this.state.password)
			return alert('Invalid Email or password!');

		AuthService.login({email: this.state.email, password: this.state.password})
			.then((response) => {
				if(!response.success)
					return alert('Invalid Email or password!');

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
			<div className="row ma-40 ma-cl-h">
				<form className="col-6 col-offset-3 row">
					<div className="center-text login-header">
						<Link to="/" className="bucket-logo"><img src="/images/logo.png" alt="Colorbucket logo" /></Link>
						<h3>save the colors that you ♥</h3>
					</div>

					<h3>Login</h3>

					<label>Your email</label>
					<input className="full-width" onChange={(e) => this._handleChange(e)} type="email" placeholder="Email" id="email" />

					<label>Password</label>
					<input className="full-width" onChange={(e) => this._handleChange(e)} type="password" placeholder="Password" id="password" />
						
					<div className="center-text">
		      	<input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Login"/>
						<div className="login-hit">
							Don't have an account? <Link to="/login/signup">Signup</Link>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;