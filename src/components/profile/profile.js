import React, { Component } from 'react';
import { Link } from 'react-router';
import Gravatar from 'gravatar-api';
import ColorList from '../color/list/color-list';
import UserService from '../../services/user.service';
//

class Profile extends Component {
	state = {
		user: {},
    localUser: {},
    auth: false
	};

	componentDidMount() {
    let that = this;
    this.setState({
      user: {profileImage: "https://secure.gravatar.com/avatar/c193326ef30d26782e7b121eeda538df?size=200&d=mm"},
      localUser: UserService.local()
    });

    UserService.get(this.props.params.user_id)
      .then((response) => {
        if(!response.success)
          return alert(response.message);

        if(response.data)
          response.data.profileImage = Gravatar.imageUrl({email: !response.data.email ? "" : response.data.email, parameters: { "size": "200", "d": "mm" },secure: true});
        this.setState({user: response.data});
        if(window.localStorage.userToken)
          this.setState({auth: true});
      });
	}

  render() {
    return (
      <div className="container-lg">
        { !this.state.user ?
          <p className="center-text">Whoops! User not found :-(</p>
          :
          <div>
            { this.state.localUser._id != this.state.user._id ? "" :
              <div className="col-12 right-text pd-5 pd-cl-h">
                <Link to={'/u/edit/'+this.state.user._id} className="button ion-ios-color-wand-outline button-primary ma-cl-v sm" type="button">update</Link>
              </div>
            }
            <div className="profile-view center-text col-3 ma-20 ma-cl-h" data-aos="fade-right">
              <img src={this.state.user.profileImage} />
              <h4 className="ma-cl-v">{this.state.user.name}</h4>
              <p className="ma-5 ma-cl-h">{this.state.user.about}</p>
            </div>
            <div className="col-9 three-tiles-list" data-aos="fade-left">
              {!this.state.user._id ? "" :
                <ColorList key={this.state.user._id} {...this.state.user} />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Profile;
