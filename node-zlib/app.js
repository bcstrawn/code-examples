var zlib = require('zlib');
var gzip = zlib.createGzip();
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
	console.log(JSON.stringify(result, null, 4));
	console.log(result.map.layer[0].data[0]._)

	var compressedMapData = result.map.layer[0].data[0]._;
	var buffer = new Buffer(compressedMapData, 'base64');

	zlib.unzip(buffer, function(err, uncompressed) {
		if (err) throw err;
		
		//console.log(uncompressed.toString());
		//fs.writeFile('test.txt', uncompressed.toString());
		fs.writeFile('test.txt', result);
	});
});

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
			eJzt1TEKADEIBEC9Lvn/g3Nw2ASu1mIGFltBFjMinmCK9WZ3L8GvjK8vNelVfdGbWfRjFveYJa+4Ta91xS8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKAQg3AH0=
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

	var map = $(data).find("map");
	var orientation = map.attr("orientation");
	tmx['tilesets'] = [];
	map.find("tileset").each(function (i, xtileset) {
		var ts = $(xtileset);
		if (ts.attr('name') != "obstruction") {
			var tileset = {};
			tileset['tileSize'] = new goog.math.Size(
				parseInt(ts.attr("tilewidth"), 10),
				parseInt(ts.attr("tileheight"), 10)
			);
			if (ts.attr("spacing")) {
				tileset['spacing'] = parseInt(ts.attr("spacing"), 10);
			}
			if (ts.attr("margin")) {
				tileset['margin'] = parseInt(ts.attr("margin"), 10);
			}
			var image = ts.find("image").first();
			tileset['imgSize'] = new goog.math.Size(
				parseInt(image.attr("width"), 10),
				parseInt(image.attr("height"), 10)
			);
			tileset['texture'] = image.attr('source');
			tileset['firstgid'] = parseInt(ts.attr('firstgid'), 10);
			tmx['tilesets'].push(tileset);
		}
	});
	tmx['mapTileSize'] = new goog.math.Size(
		parseInt(map.attr("tilewidth"), 10),
		parseInt(map.attr("tileheight"), 10)
	);
	// parse the layers
	tmx['layers'] = [];
	map.find("layer").each(function (i, layer) {
		if ($(layer).attr("visible") != "0") {
			var blockLayer = {};
			blockLayer['blocks'] = [];

			var layerSize = new goog.math.Size(
				parseInt($(layer).attr("width"), 10),
				parseInt($(layer).attr("height"), 10)
			);
			var data = $(layer).find("data").first();
			if (data) {
				if (data.attr("encoding") != "base64" || data.attr("compression")) {
					throw "Invalid TMX Data";
				}
				var str = data.text().trim();
				var decodedData = goog.crypt.base64.decodeStringToByteArray(str);
				// fun begins here
				var offset = 0;
				var tileset = null;
				for (var row = 0; row < layerSize.height; row++) {
					for (var col = 0; col < layerSize.width; col++) {
						var gid = chesterGL.TMXBlock.unpackUInt32(decodedData, offset);
						if (gid == 0) {
							offset += 4;
							continue;
						}
						if (!tileset) {
							tileset = chesterGL.TMXBlock.findTilesetForGid(tmx['tilesets'], gid);
						}
						var b = {};
						b['gid'] = gid;
						var margin = tileset['margin'] || 0;
						var spacing = tileset['spacing'] || 0;
						var tileSize = tileset['tileSize'];
						var imageSize = tileset['imgSize'];
						var mapTileSize = tmx['mapTileSize'];

						var max_x = parseInt((imageSize.width - margin * 2 + spacing) / (tileSize.width + spacing), 10);
						gid = gid - tileset['firstgid'];
						var frame = goog.vec.Vec4.createFloat32FromValues(
							(gid % max_x) * (tileSize.width + spacing) + margin,
							(imageSize.height - tileSize.height - margin - spacing) - parseInt(gid / max_x, 10) * (tileSize.height + spacing) + margin,
							tileSize.width,
							tileSize.height
						);
						// console.log("gid " + col + "," + row + ": " + gid + "; frame: " + frame.l + "," + frame.t);
						b['frame'] = frame;
						var bx, by;
						if (orientation == "orthogonal") {
							bx = col * mapTileSize.width                           + tileSize.width/2;
							by = (layerSize.height - row - 1) * mapTileSize.height + tileSize.height/2;
						} else if (orientation == "isometric") {
							bx = mapTileSize.width/2  * (layerSize.width + col - row - 1)        + tileSize.width/2;
							by = mapTileSize.height/2 * ((layerSize.height * 2 - col - row) - 2) + tileSize.height/2;
						} else {
							throw "Invalid orientation";
						}
						b['position'] = [bx, by, 0];
						blockLayer['blocks'].push(b);
						offset += 4;
					}
				}
			} else {
				throw "No data for layer!"
			}
			tmx['layers'].push(blockLayer);
		}
	}); // each layer
	chesterGL.TMXBlock.maps[path] = tmx;
};*/