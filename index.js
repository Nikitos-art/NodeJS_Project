const prompt = require("prompt-sync")();
const fs = require("fs");
const yargs = require("yargs");
const path = require("path");
const readline = require('readline');
const { stdout } = require('process');
// const path_downloads_example = .//..//..//Downloads//access.log
const userSearch = prompt("Enter your search:  ");

const options = yargs
	.usage("Usage: -p <path>")
	.option("p", { alias: "path", describe: "Path to file", type: "string", demandOption: true })
	.argv;

const filePath = path.join(__dirname, options.path);


var instream = fs.createReadStream(filePath);
var outstream = fs.createWriteStream('89.123.1.41_requests.log');
var outstream2 = fs.createWriteStream('34.48.240.111_requests.log');
var outstream3 = fs.createWriteStream('34.48.240.111_requests.log');

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

    if (line.includes(userSearch)) {
        outstream3.write(line + "\n")
    }
});


