// Imports
const express = require('express');
const hbs = require('hbs'); 


// Create application
const app = express();
const port = 3000;
app.set('view engine', 'hbs');
app.use(express.static('views'));
hbs.registerPartials(__dirname + '/views/partials');


// Get login and sign-up pages
app.get('/', function(req, res) {
    res.render('login', {});
});

app.get('/login', function(req, res) {
    res.render('login', {});
});

app.get('/signup', function(req, res) {
    res.render('signup', {});
});


// Rider pages
app.get('/home', function(req, res) {
    res.render('home', {});
});

app.get('/reserve', function(req, res) {
    res.render('reserve', {});
});

app.get('/reserve-success', function(req, res) {
    res.render('reserve-success', {});
});

app.get('/profile', function(req, res) {
    // var username = req.params.username;
    res.render('profile', {});
});


// Admin pages
app.get('/home-admin', function(req, res) {
    res.render('home-admin', {});
});

app.get('/reserve-admin', function(req, res) {
    res.render('reserve-admin', {});
});

app.get('/reserve-success-admin', function(req, res) {
    res.render('reserve-success-admin', {});
});

app.get('/edit-admin', function(req, res) {
    res.render('edit-admin', {});
});

app.get('/profile-admin', function(req, res) {
    // var username = req.params.username;
    res.render('profile-admin', {});
});


// Helpers
hbs.registerHelper('cap', function(text) {
    return text.toUpperCase(); 
});

hbs.registerHelper('italicize', function(text) {
    var x = '<i>' + text.toUpperCase() + '</i>';
    return new hbs.SafeString(x); 
});


// Listener
app.listen(port, function() {
    console.log('App listening to ' + port);
});