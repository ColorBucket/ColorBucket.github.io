import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import UserService from '../../services/user.service';
//

class ProfileEdit extends Component {
	state = {
		user: {
      _id: this.props.params.user_id
    }
	};

	componentDidMount() {
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
        hashHistory.push('/profile');
      });
  }

  _handleChange = (e) => {
    let updtObj = this.state.user;
    updtObj[e.target.id] = e.target.value;
    this.setState(updtObj);
  }

  render() {
    return (
      <div className="container">
        <div className="col-12 row">
          <input type="text" name="name" id="name" className="lg center-text full-width clear" onChange={(e) => this._handleChange(e)} value={this.state.user.name} />
        </div>
        <div className="col-12 row">
          <label>Senha</label>
          <input type="password" name="password" id="password" className="full-width" onChange={(e) => this._handleChange(e)} value={this.state.user.password} />
        </div>
        <div className="col-12 center-text pd-5 pd-cl-h">
          <button onClick={(e) => this._updateUser(e)} className="ion-checkmark-round button-primary ma-cl-v sm" type="button">save</button>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
