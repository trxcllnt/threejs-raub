'use strict';

const three = require('./build/three');

global.__three = three;

const fs = require('fs');

(function _recurse(dir, subdir) {
	
	const current = dir + '/' + subdir;
	
	const content = fs.readdirSync(current);
	
	const dirs  = [];
	const files = [];
	
	content.forEach(file => {
		
		const stat = fs.statSync(current + '/' + file);
		
		if (stat.isDirectory()) {
			dirs.push(file);
		} else if (stat.isFile() && /.js$/.test(file)) {
			files.push(file);
		}
		
	});
	
	files.forEach(file => require(current + '/' + file));
	dirs.forEach(dir => _recurse(current, dir));
	
})(__dirname, 'examples/js');

delete global.__three;

module.exports = three;
