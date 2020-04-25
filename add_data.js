
// import module from `./models/db.js`
const db = require('./models/db.js');

//name of collection
const collection = 'admins';

//function to create database
db.createDatabase();

//details of admin
var user = {
    username: 'paulinegraida',
    password: 'hatdog',
    firstname: 'Paupau',
    email: 'paulinegraida@gmail.com',
    lastname: 'Graida'
    
};

//call insert one function
db.insertOne1(collection, user);
