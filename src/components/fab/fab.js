import React, { Component } from 'react';
import ColorAdd from '../color/add/color-add';
//
import './fab.scss';

class Fab extends Component {

	state = {
		tileOpened: false
	}

	_toggleColorAdd = () => {
		this.setState({tileOpened: !this.state.tileOpened});
	};

	render() {
		return (
			<div className="fab-container">
				<a className="buttons" data-tip="New Color" onClick={() => this._toggleColorAdd()}>
					<span className="rotate ion-plus-round"></span>
				</a>

				<div className={this.state.tileOpened ? "color-add-modal open" : "color-add-modal"}>
					<span onClick={() => this._toggleColorAdd()}>x close</span>
					<ColorAdd addCallback={this.props.addCallback} />
				</div>
			</div>
		);
	}

}

export default Fab;