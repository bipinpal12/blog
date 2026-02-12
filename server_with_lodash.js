const http = require('http');
const fs = require('fs');
const _ = require('lodash');  // Requiring lodash

const server = http.createServer((req, res) => {
   
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
        path +='index.html';
        res.statusCode = 200;
        break;

        case '/about':
        path += 'about.html';
        res.statusCode = 200;
        break;

        case '/about-me':   // Redirect case
        res.statusCode = 301;
        res.setHeader('Location', '/about');
        break;

        default:
        path += '404.html';
        res.statusCode = 404;
        break;
    }

    // Send an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
            res.end();
        } else {
            res.end(data);
        }
    });
});

server.listen(4000, 'localhost', () => {
    console.log('Listening to port 4000.')
});