'use strict';

const three = require('./build/three');

global.THREE = three;

const fs = require('fs');

(function _recurse(dir, subdir) {
	
	const current = dir + '/' + subdir;
	
	fs.readdirSync(current).forEach(file => {
		
		const stat = fs.statSync( current + '/' + file );
		
		if (stat.isDirectory()) {
			_recurse(current, file);
		} else if (stat.isFile() && /.js$/.test(file)) {
			require(current + '/' + file);
		}
		
	});
	
})(__dirname, 'examples/js');

delete global.THREE;
