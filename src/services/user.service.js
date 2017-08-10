import HttpHandler from './handlers/http.handler';
import LocalHandler from './handlers/local.handler';

const get = (id) => {
	let route = !id ? '/users' : '/users/' + id;

	return HttpHandler.request(route, 'GET', null);
}

const local = () => {
	if(localStorage.user)
		return JSON.parse(localStorage.user);

	let newTempUser = {
		_id: "temp_" + new Date().getTime(),
		name: '',
		email: '',
		about: '',
		created: new Date()
	};
	localStorage.user = JSON.stringify(newTempUser);
	return newTempUser;
}

const save = (model) => {
	return HttpHandler.request('/users', 'PUT', model);
}

const fetchColors = (id) => {
	let route = '/users/';
	route += !id ? 'colors' : id + '/colors';

	if(!window.localStorage.userToken && id.indexOf('temp_') > -1)
		return LocalHandler.fetch('colors', {user: local()._id});

	return HttpHandler.request(route, 'GET', null);
};

export default { get, save, local, fetchColors };