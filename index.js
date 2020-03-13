const express = require('express');
const hbs = require('hbs'); 
const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.use(express.static('views'));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function(req, res) {
    res.render('login', {});
});

hbs.registerHelper('cap', function(text) {
    return text.toUpperCase(); 
});

hbs.registerHelper('italicize', function(text) {
    var x = '<i>' + text.toUpperCase() + '</i>';
    return new hbs.SafeString(x); 
});

app.listen(port, function() {
    console.log('App listening to ' + port);
});