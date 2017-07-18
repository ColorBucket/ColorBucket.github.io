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
			return alert('Email ou senha inválidos!');

		AuthService.login({email: this.state.email, password: this.state.password})
			.then((response) => {
				if(!response.success)
					return alert('Email ou senha inválidos!');

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
				<div className="col-12 center-text">
					<h3>Login</h3>
				</div>
				<div className="col-12">
					<form>
						<div className="row">
							<div className="col-6 col-offset-3">
								<label>Your email</label>
								<input className="full-width" onChange={(e) => this._handleChange(e)} type="email" placeholder="Email" id="email" />
							</div>
							<div className="col-6 col-offset-3">
								<label>Password</label>
								<input className="full-width" onChange={(e) => this._handleChange(e)} type="password" placeholder="Password" id="password" />
							</div>
							<div className="col-6 col-offset-3 center-text">
						      	<input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Login"/>
							</div>
						</div>
					</form>
				</div>
				<div className="col-12 center-text login-hit">
					Não tem conta? <Link to="/login/signup">Cadastro</Link>
				</div>
			</div>
		);
	}
}

export default Login;