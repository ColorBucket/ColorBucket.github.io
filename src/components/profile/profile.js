import React, { Component } from 'react';
import { Link } from 'react-router';
import Gravatar from 'gravatar-api';
import UserService from '../../services/user.service';
//

class Profile extends Component {
	state = {
		user: {},
    auth: false
	};

	componentDidMount() {
    let that = this;
    UserService.get(this.props.params.user_id)
      .then((response) => {
        if(!response.success)
          return alert(response.message);

        response.data.profileImage = Gravatar.imageUrl({email: response.data.email, parameters: { "size": "200", "d": "mm" },secure: true});
        this.setState({user: response.data});
        if(window.localStorage.userToken)
          this.setState({auth: true});
      });
	}

  render() {
    return (
      <div className="container">
      { !this.state.auth ? 
        <div className="center-text pd-80 pd-cl-h">
          <h5 className="ma-cl-b">You are not logged in.</h5>
          <p>To be able to edit your profile + share and sync you colors you need to create an account.</p>
          <div className="col-12 row">
            <Link to="/login" className="button sm ma-5">Login</Link> or <Link to="/login/signup" className="button sm ma-5">Signup</Link>
          </div>
        </div>
        :
        <div>
        	<div className="col-12 right-text pd-5 pd-cl-h">
        		<Link to={'/u/edit/'+this.state.user._id} className="button ion-ios-color-wand-outline button-primary ma-cl-v sm" type="button">update</Link>
        	</div>
          <div className="profile-view center-text">
            <img src={this.state.user.profileImage} />
            <h4 className="ma-cl-v">{this.state.user.name}</h4>
            <p className="ma-5 ma-cl-h">{this.state.user.about}</p>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default Profile;
