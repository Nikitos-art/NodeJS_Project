
const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const io = socket(server);
const usersMap = {};
io.on('connection', (client) => {
    console.log('connection', client);
    usersMap[client.id] = {
      id: client.id,
    };
    client.on('client-msg', (data) => {
        console.log(data);
        const payload = {
            message: data.message.split('').reverse().join(''),
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', () => {
        console.log('Disconnect');
        delete usersMap[client.id];
    })

    console.log(usersMap);
});

server.listen(5555);


// const inquirer = require('inquirer');
// const yargs = require('yargs');
// const cluster = require('cluster');
// const os = require('os');
// const http = require('http');
// const fs = require('fs');
// const {lstatSync} = require('fs');
// const path = require('path');
// const io = require('socket.io');

// let currentDirectory = process.cwd();

// const options = yargs
//     .positional('d', {
//         describe: 'Path to directory',
//         default: process.cwd(),
//     })
//     .positional('p', {
//         describe: 'Pattern',
//         default: '',
//     }).argv;
// console.log(options);

// class ListItem {
//     constructor(path, fileName) {
//         this.path = path;
//         this.fileName = fileName;
//     }

//     get isDir() {
//         return lstatSync(this.path).isDirectory();
//     }
// }

// const run = async () => {
//     const list = await fs.readdir(currentDirectory);
//     const items = list.map(fileName =>
//         new ListItem(path.join(currentDirectory, fileName), fileName));

//     const item = await inquirer
//         .prompt([
//             {
//                 name: 'fileName',
//                 type: 'list',
//                 message: `Choose: ${currentDirectory}`,
//                 choices: items.map(item => ({name: item.fileName, value: item})),
//             }
//         ])
//         .then(answer => answer.fileName);

//     if (item.isDir) {
//         currentDirectory = item.path;
//         return await run();
//     } else {
//         const data = await fs.readFile(item.path, 'utf-8');

//         if (options.p == null) console.log(data);
//         else {
//             const regExp = new RegExp(options.p, 'igm');
//             console.log(data.match(regExp));
//         }
//     }
// }

// run();

// const app = http.createServer((request, response) => {
//     if (request.method === 'GET') {
          
//       const filePath = path.join(__dirname, 'index.html');
  
//       readStream = fs.createReadStream(filePath);
  
//       readStream.pipe(response);
//     } else if (request.method === 'POST') {
//       let data = '';
  
//       request.on('data', chunk => {
//       data += chunk;
//       });
  
//       request.on('end', () => {
//         const parsedData = JSON.parse(data);
//         console.log(parsedData);
  
//         response.writeHead(200, { 'Content-Type': 'json'});
//         response.end(data);
//       });
//     } else {
//         response.statusCode = 405;
//         response.end();
//     }
//   });

