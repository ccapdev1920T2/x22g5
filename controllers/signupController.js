
const Rider = require('../models/UserModel.js');

const signupController = {

   
    getSignUp: function (req, res) {
        if(req.query.err){
            res.render('signup',{err: "passwords doesn't match"});
        }
        else{
            res.render('signup');
        }
    },

    postSignUp: function (req, res) {

        
        var firstname = req.body.firstName;
        var lastname = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var confirmPassword = req.body.confirmPassword;
        var priorityLevel = req.body.priorityLevel;

        if(password === confirmPassword){
            var user = {
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                username: username,
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
        else{
            console.log("passwords doesnt match");
            res.redirect("/signup?err=nomatch");
        }
        
    }
}

module.exports = signupController;
