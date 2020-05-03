
//import Schemas
const Rider = require('../models/UserModel.js');
const Admin = require('../models/AdminModel.js');
//import db.js
const db = require('../models/db.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    //renders the login page
    getIndex: function (req, res) {

        if(req.query.err){
     
            res.render('login',{err: "User not found"});
        }
        else{
            res.render('login');
        }
          
    },

    //if user submits a username and password
    postIndex: function (req,res){

        var username = req.body.username;
        var password = req.body.password;
        //var query = {username: username,password: password};
        var query = {username: username}

        db.findOne(Admin, query, '', function(result) {
            if(result!=null){
            
                var firstname = result.firstname;
                var username = result.username;
                //if successful, direct to the home page of admin

                bcrypt.compare(password, result.password, function(err, comp){
                    if(comp === true){
                        res.redirect('/admin?firstname='+firstname+'&username='+username);
                    }
                    else{
                        console.log("incorrect password");
                    }
                });
            }
            else{
                    //find query in the collection of rider
                    db.findOne(Rider, query, '', function(result) {
                    
                        if(result == null){
                            res.redirect("/?err=nouser");
                        }
                        else{
                            var firstname = result.firstname;
                            var username = result.username;
                            bcrypt.compare(password, result.password, function(err, comp){
                                if(comp === true){
                                    res.redirect('/home?firstname='+firstname+'&username='+username);
                                }
                                else{
                                    console.log("incorrect password");
                                }
                            });
                        }
                    });
            
            }
            
        });
    }
}

module.exports = controller;
