import HttpHandler from './handlers/http.handler';

const get = (id) => {
	let route = !id ? '/users' : '/users/' + id;

	return HttpHandler.request(route, 'GET', null);
}

const local = () => {
	return JSON.parse(localStorage.user);
}

const save = (model) => {
	return HttpHandler.request('/users', 'PUT', model);
}

const fetchColors = (id) => {
	let route = '/users/';
	route += !id ? 'colors' : id + '/colors';

	return HttpHandler.request(route, 'GET', null);
};

export default { get, save, local, fetchColors };