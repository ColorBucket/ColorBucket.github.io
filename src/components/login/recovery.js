import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Recovery extends Component {
	state = {
    email: '',
    recovered: false
	};

	_confirm = async(e) => {
		e.preventDefault();
    let emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(!this.state.email || !emailregex.test(this.state.email))
			return Notification.error('Invalid Email!');
    
    let that = this;
		AuthService.recovery({email: this.state.email})
			.then((response) => {
        if(!response.success)
					return Notification.error(response.message);

				that.setState({recovered: true});
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
						<h3>Password Recovery</h3>

            {this.state.recovered 
            ? <h6>Email sent! Check your email.</h6>
            : 
              <div>
                <label>Your email</label>
                <input className="full-width" onChange={(e) => this._handleChange(e)} type="email" placeholder="Email" id="email" />
                  
                <div className="center-text">
                  <input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Send recovery email"/>
                  <div className="login-hit">
                    Don't have an account? <Link to="/login/signup">Signup</Link>
                  </div>
                </div>
              </div>
            }
					</div>
				</form>
			</div>
		);
	}
}

export default Recovery;