

const express = require('express');

const controller = require('../controllers/controller.js');

const signupController = require('../controllers/signupController.js');

const profileController = require('../controllers/profileController.js');

const homeController = require('../controllers/homeController.js');

const reserveController = require('../controllers/reserveController.js');

const adminController = require('../controllers/adminController.js');

const adminprofileController = require('../controllers/adminprofileController.js');

const editController = require('../controllers/editController.js');

const reserveadminController = require('../controllers/reserveadminController.js');


const reserveSuccessController = require('../controllers/reserveSuccessController.js');




const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.post('/login', controller.postIndex);

app.get('/signup', signupController.getSignUp);

app.post('/signup', signupController.postSignUp);

app.get('/home', homeController.getHome);

app.get('/profile', profileController.getProfile);

app.get('/deleteProfile', profileController.deleteProfile);

app.post('/profile', profileController.postProfile);

app.get('/reserve', reserveController.getReserve);

app.post('/reserve', reserveController.postReserve);

app.get('/admin', adminController.getAdmin);

app.get('/profileAdmin', adminprofileController.getProfile);

app.get('/approveProfile', adminprofileController.approveProfile);

app.get('/rejectProfile', adminprofileController.rejectProfile);

app.post('/profileAdmin', adminprofileController.postProfile);

app.get('/editAdmin', editController.getEdit);

app.get('/editReservations', editController.editReserve);

app.post('/editAdmin', editController.postEdit);

app.get('/reserveAdmin', reserveadminController.getadminReserve);

app.post('/reserveAdmin', reserveadminController.postadminReserve);

app.get('/reserveAdminSuccess', reserveSuccessController.getReserveSuccessAdmin);

app.get('/reserveSuccess', reserveSuccessController.getReserveSuccess);


module.exports = app;
