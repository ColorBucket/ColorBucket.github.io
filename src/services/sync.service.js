import HttpHandler from './handlers/http.handler';
import LocalHandler from './handlers/local.handler';
import ColorService from './color.service';
import UserService from './user.service';

const syncColors = (callback) => {
	LocalHandler.fetchTemp('colors')
		.then(response => {
			if(!response.success || response.data.length == 0)
				return false;

			response.data.map(tempcolor => {
				ColorService.save({hex: tempcolor.hex, name: tempcolor.name, user: UserService.local()._id})
					.then(savedcolor => {
						if(savedcolor.success) {
							LocalHandler.remove('colors', tempcolor._id);
							if(callback)
								callback();
						}
					});
			});
		});
}

export default {syncColors};