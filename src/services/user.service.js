'use strict'

import HttpHandler from './handlers/http.handler';

function get() {
	return HttpHandler.request('/users', 'GET', null);
}

function local() {
	return JSON.parse(localStorage.user);
}

function save(model) {
	return HttpHandler.request('/users', 'PUT', model);
}

export default { get, save, local };