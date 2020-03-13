const express = require('express');
const hbs = require('hbs'); 
const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.use(express.static('views'));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function(req, res) {
    res.render('home', {
        title: 'Welcome!',
        img: imgsrc
    });
});

app.get('/profile', function(req, res) {
    var firstname = 'Stephen';
    var lastname = 'Salamante';
    var idno = '118';
    var degree = 'BS Computer Science';
    var imgsrc = 'assets/img/icon.jpg';
    
    res.render('profile', { 
        title: 'About Me',
        fn: firstname, 
        ln: lastname, 
        id: idno, 
        degree: degree, 
        img: imgsrc 
    });
});

app.get('/academics', function(req, res) {
    res.render('academics', {
        title: 'Courses Taken',
        firstyear: 'Freshman Year',
        secondyear: 'Sophomore Year',
        firstterm: '1st Term',
        secondterm: '2nd Term',
        thirdterm: '3rd Term'
      });
});

app.get('/activities', function(req, res) {
    res.render('activities', {
        title: 'Extra Curricular Activities',
        org1: 'La Salle Computer Society',
        org1_pos: 'AVP for Publicity and Creatives',
        org2: 'DLSU PUSA',
        org2_pos: 'Member'
      });
});

hbs.registerHelper('cap', function(text) {
    return text.toUpperCase(); 
});

hbs.registerHelper('slant', function(text) {
    var x = '<i>' + text.toUpperCase() + '</i>';
    return new hbs.SafeString(x); 
});

app.listen(port, function() {
    console.log('App listening to ' + port);
});