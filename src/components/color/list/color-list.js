import React, { Component } from 'react';
import ColorTile from '../tile/color-tile';
//
import UserService from '../../../services/user.service';

class ColorList extends Component {
	state = {
		colors: []
	};

	componentDidMount() {
		let that = this;
		UserService.fetchColors(this.props._id)
			.then(result => {
				if(result.data)
					that.setState({colors: result.data});
			});
	}

	render() {
		return (
			<div className="color-list">
				{this.state.colors.length === 0 ?
        	<p className="empty-list center-text">this user has no colors :-(</p>
        	: 
        	this.state.colors.map(color => {
      			return <ColorTile key={color._id} readonly={true} {...color} />
        	})
        }
			</div>
		);
	}
}

export default ColorList;