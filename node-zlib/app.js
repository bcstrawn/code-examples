var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');


var buffer = new Buffer('eJzT0yMAAGTvBe8=', 'base64');

zlib.unzip(buffer, function(err, buffer) {
	if (!err) {
		console.log(buffer.toString());
	}
});