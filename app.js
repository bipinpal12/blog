require('dotenv').config(); // For environment variables.

// console.log(process.env);   // Debug
// console.log(process.env.PORT);  

// This is a continuation in server_with_express, people called it as app.js.
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express app
const app = express();

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

if(!PORT || !dbURI){
    console.error("Environment variables are missing!");
    process.exit(1);
    
}

mongoose.connect(dbURI)
    .then((result) => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running at: ${PORT}`);
        });
    })
.catch((err) => console.err("Database connection failed:", err));

// Register view engine
app.set('view engine', 'ejs');

// MIDDLEWARE and static files
app.use(express.static('public'));
// For POST request
app.use(express.urlencoded({ extended: true }));  //urlencoded take all the url encoded data and passed that into an object that we can use in the request object  
app.use(express.json());  
app.use(morgan('dev'));
// After installing morgan through npm we don't neet this
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// })


// app.set('views', 'myviews'); // This is for setup of view of files like html inside views but ejs go inside views folder its defalut feature

// -----------------------------------------------------------------------------------------
// Mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2026',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('698ef1e19d4ef9f6ad5ee6d5')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })
// Listen for request
// app.listen(3000); // We will listen this when there is connection with database.
// --------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    // res.send('<p> Home page.</p>'); 
    // res.sendFile('./views/index.html', { root: __dirname }); // Telling express the current directory by donig __dirname

    // After ejs installing
    // const blogs = [
    //     {title: 'AI/ML', snippet: 'lorem ipsum can be get by entering'},
    //     {title: 'My development journey', snippet: 'lorem ipsum can be get by entering'},
    //     {title: 'My robotic journey', snippet: 'lorem ipsum can be get by entering'},
    // ];

    // res.render('index', { title: 'Home', blogs });

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.send('<p> Home page.</p>'); 
    // res.sendFile('./views/about.html',  { root: __dirname });
    res.render('about', { title: 'About' });
});



// Blog routes
app.use('/blogs', blogRoutes); // Using it as middleware



// Redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { title: 'Error' });
});
