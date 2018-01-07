'use strict';

module.exports = function (fn) {
	return function () {
		const gen = fn.apply(this, arguments);

		return new Promise((res, rej) => {
			let state = {};

			while (!state.done) {
				try {
					state = gen.next();
				} catch (e) {
					state.done = true;
					return rej(e);
				}
			}

			return res(state.value);
		});
	};
}
