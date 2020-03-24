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
    var firstname = 'Jeno';

    res.render('home', {
        firstname: firstname
    });
});

app.get('/reserve', function(req, res) {
    res.render('reserve', {});
});

app.get('/reserve-success', function(req, res) {
    res.render('reserve-success', {});
});

app.get('/profile', function(req, res) {
    // var username = req.params.username;
    var firstname = 'Jeno';
    var lastname = 'Lee';
    var priority = '1';
    var username = 'jenolee';
    var email = 'lee_jeno@dlsu.edu.ph';
    var icon_rider = '/assets/img/rider.png';

    res.render('profile', {
        firstname: firstname,
        lastname: lastname,
        priority: priority,
        username: username,
        email: email,
        icon: icon_rider
    });
});


// Admin pages
app.get('/home-admin', function(req, res) {
    var firstname_admin = 'Willy';

    res.render('home-admin', {
        firstname: firstname_admin
    });
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
    var firstname_admin = 'Willy';
    var lastname_admin = 'Wonka';
    var username_admin = 'willywonka';
    var email_admin = 'willy_wonka@dlsu.edu.ph';
    var icon_admin = 'assets/img/admin.png';

    res.render('profile-admin', {
        firstname: firstname_admin,
        lastname: lastname_admin,
        username: username_admin,
        email: email_admin,
        icon: icon_admin
    });
});


// Helpers
hbs.registerHelper('cap', function(text) {
    return text.toUpperCase(); 
});

hbs.registerHelper('italicize', function(text) {
    var x = '<i>' + text.toUpperCase() + '</i>';
    return new hbs.SafeString(x); 
});


// Helpers
hbs.registerHelper('cap', function(text) {
    return text.toUpperCase(); 
});


// Listener
app.listen(port, function() {
    console.log('App listening to ' + port);
});