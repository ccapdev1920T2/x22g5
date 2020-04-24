//import db and Rider Schema
const Rider = require('../models/UserModel.js');
const db = require('../models/db.js');

const signupController = {

    /*
        renders sign up page
    */
   
    getSignUp: function (req, res) {
        /*
            if error, reload the page with error
        */
        if(req.query.err){
            var error = req.query.err;
            res.render('signup',{err: error});
        }
        else{
            res.render('signup');
        }
    },

    /*
        if user submits a registration, data will be
        added to the collection riders
    */
    postSignUp: function (req, res) {

        
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var confirmPassword = req.body.confirmPassword;
        var priorityLevel = req.body.priorityLevel;
        
        var query = {username: username};
        
        //if password and confirm password matches
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
            //checks if username already exists 
            db.findOne(Rider, query, '', function(result) {
                    //if user exists, display error
                if(result!=null){
                    console.log("User already exists");
                    res.redirect("/signup?err=UserExists");
                }

                /*
                    if username is unique, inserts data
                    in the collection riders
                */
                else{

                db.insertOne(Rider, user, function(flag) {

                    if(flag){
                     console.log("1 document added");
                     res.redirect('/');
                    }
                    else{
                        console.log("Error in input");
                        res.redirect('/signup');
                    }
                 });
                }
            });
        }

        /*
        Error validation
        Possible errors:
        User exists
        Password does not match
        */
        else{
            console.log("passwords doesnt match");
            res.redirect("/signup?err=Error:Password");
        }
        
    }
}

module.exports = signupController;
