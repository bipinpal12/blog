// This is a continuation in server_with_express, people called it as app.js.
const express = require('express');
const path = require('path');
// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
// app.set('views', 'myviews'); // This is for setup of view of files like html inside views but ejs go inside views folder its defalut feature

// Listen for request
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p> Home page.</p>'); 
    // res.sendFile('./views/index.html', { root: __dirname }); // Telling express the current directory by donig __dirname

    // After ejs installing
    const blogs = [
        {title: 'AI/ML', snippet: 'lorem ipsum can be get by entering'},
        {title: 'My development journey', snippet: 'lorem ipsum can be get by entering'},
        {title: 'My robotic journey', snippet: 'lorem ipsum can be get by entering'},
    ];

    res.render('index', { title: 'Home', blogs });

});

app.get('/about', (req, res) => {
    // res.send('<p> Home page.</p>'); 
    // res.sendFile('./views/about.html',  { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// Redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { title: 'Error' });
});