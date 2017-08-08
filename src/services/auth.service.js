import HttpHandler from './handlers/http.handler';

const signup = (model) => {
	return HttpHandler.request('/signup', 'POST', model);
}

const login = (model) => {
	return HttpHandler.request('/login', 'POST', model);
}

export default { login, signup };