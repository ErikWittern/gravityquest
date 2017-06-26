var fs = require('fs'),
	xml2js = require('xml2js');

// var font = '/font_black_8';
// var font = '/font_black_12';
// var font = '/font_black_16';
// var font = '/font_black_24';
// var font = '/font_black_32';
// var font = '/font_black_40';
// var font = '/font_black_48';
// var font = '/font_white_8';
// var font = '/font_white_12';
// var font = '/font_white_16';
// var font = '/font_white_24';
// var font = '/font_white_32';
// var font = '/font_white_40';
 var font = '/font_white_48';

var parser = new xml2js.Parser({ explicitRoot: false, mergeAttrs: true, explicitArray: false });

parser.on('end', function(result) {
	result.char = result.chars.char;
	delete result.chars;

	var json = JSON.stringify(result);
	fs.writeFile(__dirname + font + ".json", json, function(err) {
    	if(err) {
        	console.log(err);
    	} else {
        	console.log("The file " + font + ".json was saved!");
    	}
    });
});

fs.readFile(__dirname + font + ".fnt", function(err, data) {
	parser.parseString(data);
});

