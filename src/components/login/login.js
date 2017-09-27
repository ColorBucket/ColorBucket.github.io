import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Login extends Component {
	state = {
		email: '',
		password: '',
		name: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.email || !this.state.password)
			return Notification.error('Invalid Email or password!');

		AuthService.login({email: this.state.email, password: this.state.password})
			.then((response) => {
				if(!response.success)
					return Notification.error('Invalid Email or password!');

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
			<div className="row">
				<div className="center-text login-header col-6 flex flex-center">
					<div>
						<Link to="/" className="bucket-logo"><img src="/images/logo.png" alt="Colorbucket logo" /></Link>
						<h3>save the colors that you ♥</h3>
					</div>
				</div>
				<form className="col-4 col-offset-1 row pd-10 pd-cl-v flex flex-center">
					<div>
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
							<div className="login-hit">
								<i>Forgot your password? <Link to="/login/recovery">Reset Password</Link></i>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;