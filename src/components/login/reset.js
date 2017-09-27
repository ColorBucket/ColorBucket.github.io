import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/auth.service';
import Notification from '../../services/notification.service';

class Reset extends Component {
	state = {
    password: '',
    recovered: false
	};

	_confirm = async(e) => {
		e.preventDefault();

		if(!this.state.password || this.state.password.length < 6)
      return Notification.error('Password must be longer than 6 characters!');
    
    let that = this;
		AuthService.updatePassword({password: this.state.password, recoveryCode: this.props.params.recovery_code})
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
						<h3>Reset your password</h3>

            { this.state.recovered 
            ? <h6 className="center-text">Password updated. You can now <Link to="/login">log in</Link></h6>
            :
              <div>
                <label>New password</label>
                <input className="full-width" onChange={(e) => this._handleChange(e)} type="password" placeholder="New password" id="password" />
                
                <div className="center-text">
                  <input type="submit" className="button-primary" onClick={(e) => this._confirm(e)} value="Change password"/>
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

export default Reset;