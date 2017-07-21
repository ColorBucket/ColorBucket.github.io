import HttpHandler from './handlers/http.handler';

const save = (vm) => {
	let action = !vm._id ? 'POST' : 'PUT';

	if(vm.hex.indexOf('#') > -1)
		vm.hex = vm.hex.replace('#', '');

	return HttpHandler.request('/colors', action, vm);
};

const remove = (id) => {
	return HttpHandler.request('/colors', 'DELETE', id);
};

const fetch = (id) => {
	return HttpHandler.request('/colors' + id, 'GET', null);
};

export default { save, remove, fetch };