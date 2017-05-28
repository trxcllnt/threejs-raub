'use strict';

const three = require('./build/three');

three.extension = (file) => {
	
	global.__three = three;
	
	try {
		require(`./examples/js/${file}`);
	} catch (ex) {
		console.error('Error loading extension, probably missing header.');
		console.error(ex);
	}
	
	delete global.__three;
	
};

module.exports = three;
