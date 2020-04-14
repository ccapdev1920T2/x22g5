
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const adminprofileController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile: function (req, res) {


        // query where `idNum` is equal to URL parameter `idNum`
        


        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = {userName: req.query.userName};
            console.log("Username: ",req.query.userName);
            dbo.collection("admin").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("Result found: ",result);

          
            var details = {
                firstname: result[0].firstName,
                lastname: result[0].lastName,
                email: result[0].email,
                username: result[0].userName,   
            };
                
            res.render('profile-admin',details);
            db.close();

     });
     
     });

    
      
    },

    postProfile: function (req,res){


        var username = req.query.userName;
        var userName = req.body.username;
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrows-express");
        var query = { userName: username};

        var newvalues = { $set: {firstName: firstName, lastName: lastName, password: password, email: email, userName: userName} };
        dbo.collection("admin").updateOne(query, newvalues, function(err, res) {
         if (err) throw err;
            console.log("1 document updated");
            db.close();
         });
        });

        res.redirect('/profileAdmin?firstname='+firstName+'&userName='+userName);
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = adminprofileController;
