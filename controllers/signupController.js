
// import module `database` from `../models/db.js`
//const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Rider = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const signupController = {

    /*
        executed when the client sends an HTTP GET request `/signup`
        as defined in `../routes/routes.js`
    */
    getSignUp: function (req, res) {
        res.render('signup');
    },

    /*
        executed when the client sends an HTTP POST request `/signup`
        as defined in `../routes/routes.js`
    */
    postSignUp: function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="firstName">
            can be retrieved using `req.body.firstName`
        */
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var userName = req.body.userName;
        var password = req.body.password;
        var email = req.body.email;
        var confirmPassword = req.body.confirmPassword;
        var priorityLevel = req.body.priorityLevel;

        var user = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            userName: userName,
            confirmPassword: confirmPassword,
            priorityLevel: priorityLevel
        }

        

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                if (err) throw err;
                 var dbo = db.db("arrows-express");
                dbo.collection("rider").insertOne(user, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
        
            });
        });
        

        res.redirect('/');
        
    }
}

module.exports = signupController;
