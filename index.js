// Используя наработки практического задания прошлого урока, создайте веб-версию приложения. Сделайте так, чтобы при запуске она:

// показывала содержимое текущей директории;

// давала возможность навигации по каталогам из исходной папки;

// при выборе файла показывала его содержимое.

const inquirer = require('inquirer');
const yargs = require('yargs');
const cluster = require('cluster');
const os = require('os');
const http = require('http');
const fs = require('fs');
const {lstatSync} = require('fs');
const path = require('path');


let currentDirectory = process.cwd();
const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;
console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListItem(path.join(currentDirectory, fileName), fileName));

    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        currentDirectory = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (options.p == null) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            console.log(data.match(regExp));
        }
    }
}

run();

  http.createServer((request, response) => {

    setTimeout(() => {
      if (request.method === 'GET') {
      const filePath = path.join(__dirname, currentDirectory);

      readStream = fs.createReadStream(filePath);

      response.writeHead(200, { 'Content-Type': 'text/html'});

      readStream.pipe(response);
    } else if (request.method === 'POST') {
      let data = '';

      request.on('data', chunk => {
        data += chunk;
      });

      request.on('end', () => {
        const parsedData = JSON.parse(data)});
