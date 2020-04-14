
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');


// import module `signupController` from `../controllers/signupController.js`
const signupController = require('../controllers/signupController.js');

// import module `successController` from `../controllers/successController.js`
const successController = require('../controllers/successController.js');

// import module `profileController` from `../controllers/profileController.js`
const profileController = require('../controllers/profileController.js');

const homeController = require('../controllers/homeController.js');

const reserveController = require('../controllers/reserveController.js');

const app = express();

/*
    execute function getFavicon()
    defined in object `controller` in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/favicon.ico`
*/
app.get('/favicon.ico', controller.getFavicon);

/*
    execute function getIndex()
    defined in object `controller` in `../controllers/controller.js`
    when a client sends an HTTP GET request for `/`
*/
app.get('/', controller.getIndex);

app.post('/login', controller.postIndex);

/*
    execute function getSignUp()
    defined in object `signupController` in `../controllers/signupController.js`
    when a client sends an HTTP GET request for `/signup`
*/
app.get('/signup', signupController.getSignUp);

/*
    execute function postSignUp()
    defined in object `signupController` in `../controllers/signupController.js`
    when a client sends an HTTP POST request for `/signup`
*/
app.post('/signup', signupController.postSignUp);

/*
    execute function getSuccess()
    defined in object `successController` in `../controllers/successController.js`
    when a client sends an HTTP GET request for `/success`
*/
app.get('/success', successController.getSuccess);

/*
    execute function getProfile()
    defined in object `profileController` in `../controllers/profileController.js`
    when a client sends an HTTP GET request for `/profile/:idNum`
    where `idNum` is a parameter
*/
app.get('/home', homeController.getHome);

app.get('/profile', profileController.getProfile);

app.post('/profile', profileController.postProfile);

app.get('/reserve', reserveController.getReserve);

app.post('/reserve', reserveController.postReserve);


/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;
