import React, { Component } from 'react';
//
import ColorService from '../../../services/color.service';
import './color-tile.scss';

class ColorTile extends Component {
	_deleteColor = () => {
		let that = this;
		ColorService.remove({_id: this.props._id})
			.then(response => {
				that.props.deleteCallback();
			});
	};

	render() {
		return (
			<div className="color-tile" style={{'backgroundColor': '#'+this.props.hex}}>
				<p className="ion-ios-trash" onClick={() => this._deleteColor()}></p>
				<small>{ !this.props.name ? '#'+this.props.hex : this.props.name + ' (#' + this.props.hex + ')' }</small>
			</div>
		);
	}
}

export default ColorTile;