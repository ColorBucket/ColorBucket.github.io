import React, { Component } from 'react';
import ColorTile from '../tile/color-tile';
//
import UserService from '../../../services/user.service';

class ColorList extends Component {
	state = {
		colors: [],
		filter: ''
	};

	componentDidMount() {
		this._componentInitialize(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this._componentInitialize(nextProps);
	}

	_componentInitialize(propsobj) {
		let that = this;
		
		if(propsobj.colors)
			this.setState({colors: propsobj.colors});

		if(propsobj._id)
			UserService.fetchColors(propsobj._id)
				.then(result => {
					if(result.data)
						that.setState({colors: result.data});
				});
	}

	_filterColors = () => {
		if(!this.state.filter || !this.state.colors || this.state.colors.length == 0)
			return this.state.colors;

		let filteredColors = [];
		this.state.colors.map(color => {
			if(color.name && color.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1)
				filteredColors.push(color);
		});

		return filteredColors;
	}

	_handleChange = (e) => {
		let updtObj = {};
		updtObj[e.target.id] = e.target.value;
		this.setState(updtObj);
	}

	render() {
		return (
			<div className="color-list">
				{this.state.colors.length === 0 ?
        	<p className="empty-list center-text">we found no colors :-(</p>
        	: 
        	<div>
        		<div style={{'display': this.props.hidefilter ? 'none' : 'inherit'}} className="col-12 center-text">
        			<input type="text" className="sm-input" placeholder="filter by color tag" id="filter" onChange={(e) => this._handleChange(e)} />
        		</div>
	        	{this._filterColors().map(color => {
        			return <ColorTile key={color._id} readonly={true} {...color} />
	        	})}
        	</div>
        }
			</div>
		);
	}
}

export default ColorList;