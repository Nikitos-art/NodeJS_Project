const PATH = 'C:/Users/Admin/Downloads/access.log'


var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');
const { stdout } = require('process');

var instream = fs.createReadStream(PATH);
var outstream = fs.createWriteStream('89.123.1.41_requests.log');
var outstream2 = fs.createWriteStream('34.48.240.111_requests.log');


var rl = readline.createInterface({
    input: instream,
    output: stdout,
});

rl.on('line', function(line) {

    if (line.includes('89.123.1.41')) {
        outstream.write(line + "\n")
    }

    if (line.includes('34.48.240.111')) {
        outstream2.write(line + "\n")

    }
});

