
//import Schemas
const Rider = require('../models/UserModel.js');
const Admin = require('../models/AdminModel.js');
//import db.js
const db = require('../models/db.js');

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
        var query = {username: username,password: password};

        /*
        finds the username and password in the database through the 
        collection admin, if the result is not null, it will proceed to the
        home page for admin, else the program will search for 
        the query in the rider collection, if the result is not null, it will 
        proceed to the home page for riders, else it reloads the login page 
        */

            db.findOne(Admin, query, '', function(result) {
                if(result!=null){
                
                    var firstname = result.firstname;
                    var username = result.username;
                    //if successful, direct to the home page of admin
                    res.redirect('/admin?firstname='+firstname+'&username='+username);

                }
                else{
                        //find query in the collection of rider
                        db.findOne(Rider, query, '', function(result) {

                            //if null, reload the page
                        
                            if(result == null){

                                console.log("pumasok sa null");
                           
                                res.redirect("/?err=nouser");
                            }
                            else{
                                var firstname = result.firstname;
                                var username = result.username;
                                res.redirect('/home?firstname='+firstname+'&username='+username);
                            }
                        });
                
                }
                
            });

    
       

    }
}

module.exports = controller;
