
const Rider = require('../models/UserModel.js');
const db = require('../models/db.js');

const signupController = {

   
    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {

        
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var confirmPassword = req.body.confirmPassword;
        var priorityLevel = req.body.priorityLevel;

        

        var rider = {
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            username: username,
            confirmPassword: confirmPassword,
            priorityLevel: priorityLevel
        }


        db.insertOne(Rider, rider, function(flag) {

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
}

module.exports = signupController;
