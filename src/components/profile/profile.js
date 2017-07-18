import React, { Component } from 'react';
import { Link } from 'react-router';
import UserService from '../../services/user.service';
//

class Profile extends Component {
	state = {
		user: {}
	};

	componentDidMount() {
		let localUser = UserService.local();
		this.setState({user: localUser});
	}

  render() {
    return (
      <div className="container">
      	<div className="col-12 right-text pd-5 pd-cl-h">
      		<Link to={'/profile/'+this.state.user._id} className="button ion-ios-color-wand-outline button-primary ma-cl-v sm" type="button">update</Link>
      	</div>
        <h5 className="ma-cl-v">{this.state.user.name}</h5>
        <p>{this.state.user.email}</p>
      </div>
    );
  }
}

export default Profile;
