'use strict'

import HttpHandler from './handlers/http.handler';

function signup(model) {
	return HttpHandler.request('/signup', 'POST', model);
}

function login(model) {
	return HttpHandler.request('/login', 'POST', model);
}

export default { login, signup };