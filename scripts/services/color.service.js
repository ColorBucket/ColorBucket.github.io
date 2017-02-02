define(function (require) { 

	const db = require('contexts/dexie.context');
	const ctx = db.colors;

	function create(vm) {
		return ctx.add(vm);
	}

	function get(params) {
		if(!params)
			return ctx.toArray();

		return ctx.where('_id').notEqual(-1)
				.and(function(o){
					let absoluteTrue = true;
					
					for (prop in params) {
					    if (params.hasOwnProperty(prop)) {
					        absoluteTrue = params[prop] === o[prop] && absoluteTrue;
					    }
					}

					return absoluteTrue;
				}).toArray();
	}

	function update(vm) {
		return ctx.put(vm);
	}

	function remove(params) {
		return ctx.where('_id').notEqual(-1)
				.and(function(o){
					let absoluteTrue = true;
					
					for (prop in params) {
					    if (params.hasOwnProperty(prop)) {
					        absoluteTrue = params[prop] === o[prop] && absoluteTrue;
					    }
					}

					return absoluteTrue;
				}).delete();
	}
	
	const service = {
		get: get,
		create: create,
		update: update,
		remove: remove
	};
	return service;
});