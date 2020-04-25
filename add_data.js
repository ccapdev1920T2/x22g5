
// import module from `./models/db.js`
const db = require('./models/db.js');

//name of collection
const collection = 'admins';

//function to create database
db.createDatabase();

//details of admin
var user = {
    username: 'arren_antioquia',
    password: 'hatdog',
    firstname: 'Dr.Arren',
    email: 'arren@dlsu.edu.ph',
    lastname: 'Antioquia'
    
};

//call insert one function
db.insertOne1(collection, user);
