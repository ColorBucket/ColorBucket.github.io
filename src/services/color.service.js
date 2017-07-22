import HttpHandler from './handlers/http.handler';
import LocalHandler from './handlers/local.handler';

const save = (vm) => {
	let action = !vm._id ? 'POST' : 'PUT';

	if(vm.hex.indexOf('#') > -1)
		vm.hex = vm.hex.replace('#', '');

	if(!window.localStorage.userToken)
		return LocalHandler.save('colors', vm);

	return HttpHandler.request('/colors', action, vm);
};

const remove = (id) => {
	if(!window.localStorage.userToken)
		return LocalHandler.remove('colors', id._id);

	return HttpHandler.request('/colors', 'DELETE', id);
};

const fetch = (id) => {
	if(!window.localStorage.userToken)
		return LocalHandler.save('colors', id);

	return HttpHandler.request('/colors' + id, 'GET', null);
};

export default { save, remove, fetch };