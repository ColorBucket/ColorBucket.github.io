import React, { Component } from 'react';
import { Link } from 'react-router';
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
			<div className="tile-holder">
				<div className="color-tile" style={{'backgroundColor': '#'+this.props.hex}}>
					{ !this.props.readonly ?
						<p className="ion-ios-trash" onClick={() => this._deleteColor()}></p>
						: ""
					}
				</div>
				<small>{ !this.props.name ? '#'+this.props.hex : this.props.name + ' (#' + this.props.hex + ')' }</small>
				{this.props.readonly && typeof(this.props.user) === 'object' ?
					<small className="user-link">by <Link to={'/u/'+this.props.user.username}>@{this.props.user.username}</Link></small>
				: ''
				}
			</div>
		);
	}
}

export default ColorTile;