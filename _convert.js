'use strict';

const fs = require('fs');

(function _recurse(dir, subdir) {
	
	const current = dir + '/' + subdir;
	
	fs.readdirSync(current).forEach(file => {
		
		const stat = fs.statSync( current + '/' + file );
		
		if (stat.isDirectory()) {
			_recurse(current, file);
		} else if (stat.isFile() && /.js$/.test(file)) {
			const fileText = fs.readFileSync(current + '/' + file).toString();
			
			if (/^(\'use strict\'\;)?\s*const THREE \= global\.__three\;/.test()) {
				return; // nothing to do here
			}
			
			fs.writeFileSync(
				current + '/' + file,
				'\'use strict\';\nconst THREE = global.__three;\n\n' + fileText
			);
		}
		
	});
	
})(__dirname, 'examples/js');

