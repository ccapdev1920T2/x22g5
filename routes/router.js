//Imports
const express = require("express");
const router = express.Router();

//Routes
//Login Pages
router.get('/', function(req, res) {
    res.render('login', {});
});

router.get('/login', function(req, res) {
    res.render('login', {});
});

router.get('/signup', function(req, res) {
    res.render('signup', {});
});

// Rider pages
router.get('/home', function(req, res) {
    var firstname = 'Jeno';

    res.render('home', {
        firstname: firstname
    });
});

router.get('/reserve', function(req, res) {
    res.render('reserve', {});
});

router.get('/reserve-success', function(req, res) {
    res.render('reserve-success', {});
});

router.get('/profile', function(req, res) {
    // var username = req.params.username;
    var firstname = 'Jeno';
    var lastname = 'Lee';
    var priority = '2';
    var prioritydesc = 'Students with Inter-Campus enrolled subjects or thesis';
    var username = 'jenolee';
    var email = 'lee_jeno@dlsu.edu.ph';
    var icon_rider = '/assets/img/rider.png';

    res.render('profile', {
        firstname: firstname,
        lastname: lastname,
        priority: priority,
        prioritydesc: prioritydesc,
        username: username,
        email: email,
        icon: icon_rider
    });
});


// Admin pages
router.get('/home-admin', function(req, res) {
    var firstname_admin = 'Willy';

    res.render('home-admin', {
        firstname: firstname_admin
    });
});

router.get('/reserve-admin', function(req, res) {
    res.render('reserve-admin', {});
});

router.get('/reserve-success-admin', function(req, res) {
    res.render('reserve-success-admin', {});
});

router.get('/edit-admin', function(req, res) {
    res.render('edit-admin', {});
});

router.get('/profile-admin', function(req, res) {
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

module.exports = router;
