define(function () {
	let colorModel = function(vm) {
		if(!vm) vm = {};

		let model = {
			_id: !vm._id ? null : vm._id,
			userId: !vm.userId ? null : vm.userId,
			color: !vm.color ? null : vm.color,
			name: !vm.name ? null : vm.name,
			date: !vm.date ? new Date() : vm.date
		};

		return model;
	}

	return colorModel;
});