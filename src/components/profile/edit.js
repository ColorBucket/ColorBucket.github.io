import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import UserService from '../../services/user.service';
//
import './profile.scss';

class ProfileEdit extends Component {
	state = {
		user: {
      _id: this.props.params.user_id
    }
	};

	componentWillMount() {
    let that = this;
		UserService.get(this.props.params.user_id)
      .then((response) => {
        if(!response.success)
          return alert(response.message);

        that.setState({user: response.data});
      });
	}

  _updateUser = (e) => {
    UserService.save(this.state.user)
      .then((response) => {
        if(!response.success)
          alert('Erro ' + response.message);

        localStorage.user = JSON.stringify(this.state.user);
        hashHistory.push('/u/'+this.state.user.username);
      });
  }

  _handleChange = (e) => {
    let updtObj = this.state.user;
    updtObj[e.target.id] = e.target.value;
    this.setState(updtObj);
  }

  render() {
    return (
      <div className="container profile-edit">
        <div className="col-6 col-offset-3">
          <div className="col-12 row">
            <label>Username</label>
            <input type="text" disabled name="name" id="name" className="full-width ma-cl-v" value={this.state.user.username} />
            <small><i>* username cannot be changed</i></small>
          </div>
          <div className="col-12 row">
            <label>Name</label>
            <input type="text" name="name" id="name" className="full-width" onChange={(e) => this._handleChange(e)} value={this.state.user.name} />
          </div>
          <div className="col-12 row" key="about">
            <label>About you</label>
            <textarea name="about" id="about" className="full-width" onChange={(e) => this._handleChange(e)}>
            </textarea>
          </div>
          <div className="col-12 row">
            <label>Update Password</label>
            <input type="password" name="password" id="password" className="full-width" onChange={(e) => this._handleChange(e)} value={this.state.user.password} />
          </div>
          <div className="col-12 center-text pd-5 pd-cl-h">
            <button onClick={(e) => this._updateUser(e)} className="ion-checkmark-round button-primary ma-cl-v sm" type="button">save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
