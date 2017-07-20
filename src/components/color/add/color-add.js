import React, { Component } from 'react';
//
import './color-add.scss';
import UserService from '../../../services/user.service';

class ColorAdd extends Component {
	state = {
		user: '',
		name: '',
		hex: '',
		validHex: true
	};

	componentDidMount() {
		if(UserService.local())
			this.setState({user: UserService.local()._id});
	}

	_handleChange = (e) => {
		if(e.target.id.indexOf('hex') > -1)
			return this._handleHexInput(e.target.value);

		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	_handleHexInput = (hexValue) => {
		if(hexValue.indexOf('#') == -1)
			hexValue = '#' + hexValue;

		if(hexValue.replace('#','').length > 6)
			hexValue = hexValue.substr(0,7);

		if(/^[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(hexValue.replace('#','')))
			this.setState({validHex: true});
		else
			this.setState({validHex: false});

		this.setState({hex: hexValue});
	};

	_handleSubmit = (e) => {
		e.preventDefault();

		if(!this.state.validHex || !this.state.hex)
			return false;

		alert(JSON.stringify(this.state));
		this.setState({name: '',hex: '',validHex: true});
	};

	render() {
		return (
			<div className="color-add-input row">
				<form>
					<div className="col-12 row">
						<input type="text" className="full-width center-text" id="name" name="name" placeholder="name this color" onChange={(e) => this._handleChange(e)} value={this.state.name} />
					</div>
					<div className="col-12 row">
						<input type="text" className={this.state.validHex ? "full-width center-text ma-cl-b" : "full-width center-text ma-cl-b error-input"} id="hex" name="hex" placeholder="type your hex #000000" onChange={(e) => this._handleChange(e)} value={this.state.hex} />
						<div className="col-12 row center-text"><span>or</span></div>
						<input type="color" className="full-width center-text" name="hexPicker" id="hexPicker" value={this.state.hex} onChange={(e) => this._handleChange(e)} />
					</div>
					<div className="col-8 col-offset-2 row">
						<input type="submit" className="button button-primary ion-ios-color-wand-outline sm full-width" onClick={(e) => this._handleSubmit(e)} value="save color" />
					</div>
				</form>
			</div>
		);
	}
}

export default ColorAdd