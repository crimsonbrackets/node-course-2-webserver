const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


//app.use is how you register middleware
app.use(function(req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function(err) {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

//app.use(function(req, res, next) {
//    res.render('maintenance.hbs', {
//        pageTitle: 'Site under construction'
//        
//    });
//
//});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});
//this is how routing is done in express
app.get('/', function(req, res) {
//    res.send("<h1>I'm working!</h1>");
    
    res.render('home.hbs', {
        pageTitle: 'Velkommen',
        welcomeMessage: 'Welcome to my Express Website!',
        
    });
});

app.get('/about', function(req, res) {
    //res.render renders a view/template
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
});

app.get('/projects', function(req, res) {
    //res.render renders a view/template
    res.render('projects.hbs', {
        pageTitle: 'My Projects',
        
    });
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage: "We weren't able to process your request"
    })
});

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});