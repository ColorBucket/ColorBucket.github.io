import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';

class Signup extends Component {
	state = {
		email: '',
		password: '',
		name: ''
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.email || !this.state.password || !this.state.name)
			return alert('Dados inválidos!');

		AuthService.signup({name: this.state.name, email: this.state.email, password: this.state.password})
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
				<div className="col-12 center-text">
					<h3>Signup</h3>
				</div>
				<div className="col-12">
					<form>
						<div className="row">
							<div className="col-6 col-offset-3">
								<label>Your Name</label>
								<input className="full-width" onChange={(e) => this._handleChange(e)} type="text" placeholder="Name" id="name" />
							</div>
							<div className="col-6 col-offset-3">
								<label>Your email</label>
								<input className="full-width" onChange={(e) => this._handleChange(e)} type="email" placeholder="Email" id="email" />
							</div>
							<div className="col-6 col-offset-3">
								<label>Password</label>
								<input className="full-width" onChange={(e) => this._handleChange(e)} type="password" placeholder="Password" id="password" />
							</div>
							<div className="col-6 col-offset-3 center-text">
						      	<input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Cadastrar"/>
							</div>
						</div>
					</form>
				</div>
				<div className="col-12 center-text login-hit">
					Já tem conta? <Link to="/login">Login</Link>
				</div>
			</div>
		);
	}
}

export default Signup;