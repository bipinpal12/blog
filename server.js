const http = require('http');
const fs = require('fs'); //file system

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // Set header content type
    // res.setHeader('content-type', 'text/plain');

    // res.write('hello, Programming-Pandas');
    // res.end();

    // If you want to send html to server
    // res.setHeader('content-Type', 'text/html');

    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<p>Hello Programming Pandas</p>');
    // res.write('<p>Hello Programming Pandas! Again</p>');

    // Efficient way of doing the same thing 
    res.setHeader('Content-Type', 'text/html');

    // Send an html file 
    fs.readFile('./views/index.html', (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data);
            res.end(data); // It does the same thing as of res.write(data)      
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});