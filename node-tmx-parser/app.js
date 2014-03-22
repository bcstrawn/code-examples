var tmx = require('tmx-parser'),
	fs = require('fs');

// if you have a string (pathToFile is for resolving tilesets if necessary)
/*tmx.parse(xmlString, pathToFile, function(err, map) {
	if (err) throw err;
	console.log(map);
});*/

var filename = 'test.tmx';

// if you have a file
tmx.parseFile(filename, function(err, map) {
	if (err) throw err;

	map.layers[0].map = 'circular';
	map.layers[0].tiles = map.layers[0].tiles.slice(0, 5);
	map.layers[0].horizontalFlips = map.layers[0].horizontalFlips.slice(0, 5);
	map.layers[0].verticalFlips = map.layers[0].verticalFlips.slice(0, 5);
	map.layers[0].diagonalFlips = map.layers[0].diagonalFlips.slice(0, 5);
	

	//console.log(map);
	fs.writeFile('map.txt', JSON.stringify(map, null, 2));
});