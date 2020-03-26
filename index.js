// Imports
const express = require('express');
const hbs = require('hbs'); 
const router = require("./routes/router")


// Create application
const app = express();
const port = 3000;
app.set('view engine', 'hbs');
app.use(express.static('views'));
app.use(express.static('public'));
app.use("/", router);

hbs.registerPartials(__dirname + '/views/partials');

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