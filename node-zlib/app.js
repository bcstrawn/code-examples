var zlib = require('zlib');
var fs = require('fs');
var xml2js = require('xml2js');


/*require.extensions['.txt'] = function (module, filename) {
	module.exports = 
};

var words = require("./words.txt");*/

var file = fs.readFileSync('./test.tmx', 'utf8');
//console.dir(file);


//var xml = "<root>Hello xml2js!</root>"

xml2js.parseString(file, function (err, result) {
	//console.log(JSON.stringify(result, null, 2));
	//console.log(JSON.stringify(result, null, 4));
	console.log(result.map.layer[0].data[0]._)

	var compressedMapData = result.map.layer[0].data[0]._;
	var buffer = new Buffer(compressedMapData, 'base64');

	/*zlib.unzip(buffer, function(err, uncompressed) {
		if (err) throw err;
		
		console.log(typeof uncompressed);

		//console.log(uncompressed.toString());
		//fs.writeFile('test.txt', uncompressed.toString());
		fs.writeFile('test.txt', uncompressed);
	});*/

	var stuff = zlib.inflate(buffer);
	fs.writeFile('test2.txt', stuff);
});


/*var input = new Buffer('lorem ipsum dolor sit amet');
var compressed = zlib.deflate(input);
var output = zlib.inflate(compressed);*/


/*var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
	parser.parseString(data, function (err, result) {
		console.dir(result);
		console.log('Done');
	});
});*/



/*var buffer = new Buffer('eJzT0yMAAGTvBe8=', 'base64');

zlib.unzip(buffer, function(err, buffer) {
	if (!err) {
		fs.writeFile('test.txt', buffer.toString());
		//console.log(buffer.toString());
	}
});*/



/*
<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" width="100" height="100" tilewidth="32" tileheight="32">
	<tileset firstgid="1" name="cave" tilewidth="32" tileheight="32">
		<image source="cave.png" width="256" height="336"/>
	</tileset>
	<layer name="Tile Layer 1" width="100" height="100">
		<data encoding="base64" compression="zlib">
			eJzt1TEKADEIBEC9Lvn/g3Nw2ASu1mIGFltBFjMinmCK9WZ3L8GvjK8vNelVfdGbWfRjFve
			YJa+4Ta91xS8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKAQg3AH0=
		</data>
	</layer>
</map>


{
    "map": {
        "$": {
            "version": "1.0",
            "orientation": "orthogonal",
            "width": "100",
            "height": "100",
            "tilewidth": "32",
            "tileheight": "32"
        },
        "tileset": [
            {
                "$": {
                    "firstgid": "1",
                    "name": "cave",
                    "tilewidth": "32",
                    "tileheight": "32"
                },
                "image": [
                    {
                        "$": {
                            "source": "cave.png",
                            "width": "256",
                            "height": "336"
                        }
                    }
                ]
            }
        ],
        "layer": [
            {
                "$": {
                    "name": "Tile Layer 1",
                    "width": "100",
                    "height": "100"
                },
                "data": [
                    {
                        "_": "\n   eJzt1TEKADEIBEC9Lvn/g3Nw2ASu1mIGFltBFjMinmCK9WZ3L...",
                        "$": {
                            "encoding": "base64",
                            "compression": "zlib"
                        }
                    }
                ]
            }
        ]
    }
}

*/





/*var loadTMX = function (path) {
	var tmx = {};

	var map = data.map;
	var orientation = map.$.orientation;

	tmx.mapTileSize = {
		width: parseInt(map.$.tilewidth, 10),
		height: parseInt(map.$.tileheight, 10)
	};

	tmx.tilesets = map.tileset.filter(function(ts) {
		return ts.$.name != 'obstruction';
	}).map(function(ts) {
		return parseTileset(ts);
	});

	tmx.layers = map.layer.filter(function(layer) {
		return layer.$.visible != '0';
	}).map(function(layer) {
		return parseLayer(layer, orientation, tmx.tilesets, tmx.mapTileSize);
	});

	//chesterGL.TMXBlock.maps[path] = tmx;
};


var parseTileset = function(ts) {
	var tileset = {
		tileSize: {
			width: parseInt(ts.$.tilewidth, 10),
			height: parseInt(ts.$.tileheight, 10)
		}
	};

	if (ts.$.spacing) {
		tileset.spacing = parseInt(ts.$.spacing, 10);
	}
	if (ts.$.margin) {
		tileset.margin = parseInt(ts.$.margin, 10);
	}

	var image = ts.image[0];
	tileset.imgSize = {
		width: parseInt(image.$.width, 10),
		height: parseInt(image.$.height, 10)
	};

	tileset.texture = image.$.source;
	tileset.firstgid = parseInt(ts.$.firstgid, 10);
};


var parseLayer = function(layer, orientation, tilesets, mapTileSize) {
	var blockLayer = {
		blocks: []
	};

	var layerSize = {
		width: parseInt(layer.$.width, 10),
		height: parseInt(layer.$.height, 10)
	};

	var data = layer.data[0];
	if (!data) {
		throw 'No data for layer!'
	
	if (data.$.encoding != 'base64' || data.$.compression != 'zlib') {
		throw 'Invalid TMX Data';
	}

	var compressedMapData = data._.trim();
	var decodedData = goog.crypt.base64.decodeStringToByteArray(compressedMapData);



	// fun begins here
	var offset = 0;
	var tileset = null;
	for (var row = 0; row < layerSize.height; row++) {
		for (var col = 0; col < layerSize.width; col++) {
			var gid = unpackUInt32(decodedData, offset);
			if (gid == 0) {
				offset += 4;
				continue;
			}
			if (!tileset) {
				tileset = findTilesetForGid(tilesets, gid);
			}
			
			var block = createBlock(gid, tileset, mapTileSize, layerSize);

			blockLayer.blocks.push(block);
			offset += 4;
		}
	}

	return blockLayer;
};


var createBlock = function(gid, tileset, mapTileSize, layerSize) {
	var block = {
		gid: gid
	};
	var margin = tileset.margin || 0;
	var spacing = tileset.spacing || 0;
	var tileSize = tileset.tileSize;
	var imageSize = tileset.imgSize;
	var mapTileSize = mapTileSize;

	var max_x = parseInt((imageSize.width - margin * 2 + spacing) / (tileSize.width + spacing), 10);
	gid = gid - tileset.firstgid;
	var frame = [
		(gid % max_x) * (tileSize.width + spacing) + margin,
		(imageSize.height - tileSize.height - margin - spacing) - 
			parseInt(gid / max_x, 10) * (tileSize.height + spacing) + margin,
		tileSize.width,
		tileSize.height
	];
	// console.log("gid " + col + "," + row + ": " + gid + "; frame: " + frame.l + "," + frame.t);
	block.frame = frame;
	var bx, by;
	if (orientation == 'orthogonal') {
		bx = col * mapTileSize.width                           + tileSize.width/2;
		by = (layerSize.height - row - 1) * mapTileSize.height + tileSize.height/2;
	} else if (orientation == 'isometric') {
		bx = mapTileSize.width/2  * (layerSize.width + col - row - 1)        + tileSize.width/2;
		by = mapTileSize.height/2 * ((layerSize.height * 2 - col - row) - 2) + tileSize.height/2;
	} else {
		throw 'Invalid orientation';
	}
	block.position = [bx, by, 0];

	return block;
};


var unpackUInt32 = function (buffer, offset) {
	return (buffer[offset + 3] << 24) |
		   (buffer[offset + 2] << 16) |
		   (buffer[offset + 1] <<  8) |
		    buffer[offset + 0] >>> 0;
};


var findTilesetForGid = function (tilesets, gid) {
	var tex = tilesets[0];
	for (var i=1; i < tilesets.length; i++) {
		var ts = tilesets[i];
		if (gid >= ts.firstgid) {
			tex = ts;
		}
	}
	return tex;
};*/


/*
tmx.tilesets = [];

	map.tileset.forEach(function (ts, i) {
		if (ts.$.name != 'obstruction') {
			var tileset = parseTileset(ts);
			tmx.tilesets.push(tileset);
		}
	});
*/