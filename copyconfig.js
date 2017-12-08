var fs = require('fs-extra');
fs.copy('./node_modules/jodit/build/jodit.min.js','www/build/jodit.min.js');
fs.copy('./node_modules/jodit/build/jodit.min.css','www/build/jodit.min.css');