
// import db from `../models/db.js`
const db = require('../models/db.js');

// import module `Admin` and `Reserve` from `../models/UserModel.js`
const Admin = require('../models/AdminModel.js');
const Reserve = require('../models/ReserveModel.js');

//import mongodb
const mongodb = require('mongodb');



const adminprofileController = {

    
    getProfile: function (req, res) {

        
            var details = [];

            /*
                if an admin will login again, it empties the array details
                to avoid redundancies in data
            */
            if(details.length > 0){
                details = [];
            }

            var icon = "/assets/img/admin.png";
            var query = {username: req.query.username};
        
        /*
            gets the value of username in the url 
            and searches for the specific username 
            in the database and pushes all results in the
            details array
        */
            db.findOne(Admin, query, '', function(result) {
                details.push(result.firstname,result.lastname,
                            result.email,result.username);
            });


            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var resultArray=[];
            var dbo = db.db("arrows-express");

            /*  gets all data with status: "Pending"
                from the collection reserves
            */
            var query = {status: "Pending"};
        
            /*
                for each data seen in the database, it renders
                the details in the profile-admin.hbs and stores all
                data in the array resultArray 
            */

            var cursor = dbo.collection("reserves").find(query);
            cursor.forEach(function(doc,err){
            resultArray.push(doc);

            }, 

            /*
                renders all details in the profile-admin.hbs
            */
            
            function(){
            res.render('profile-admin',{infos: resultArray, firstname: details[0], 
                                        lastname: details[1],email: details[2],
                                        username: details[3],icon: icon});
            db.close();

                }); 
                
            });
    },

        /*
            if an admin approves a reservation
            updates the status of a specific rider
            by setting the status to "Approved"

        */

        approveProfile: function(req,res){


            var query = req.query.id;
            var query = {_id:new mongodb.ObjectId(query)};
            var newvalues = { $set: {status: "Approved"} };
            
            db.updateOne(Reserve,query,newvalues,function(result){
                res.send(true);
            });



        },

        /*
        if an admin declines a reservation
        updates the status of a specific rider
        by setting the status to "Rejected"
        */

        rejectProfile: function(req,res){


            var query = req.query.id;
            var query = {_id:new mongodb.ObjectId(query)};
            var newvalues = { $set: {status: "Rejected"} };

           
            db.updateOne(Reserve,query,newvalues,function(result){
                res.send(true);
            });

            },

            /*
                if an admin wants to update his/her profile details
                Note: all fields must be populated or must have a value
            */

        postProfile: function (req,res){

            var query = {username: req.query.username};
            var username = req.body.username;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var password = req.body.password;
            var email = req.body.email;
            

            var newvalues = { $set: {firstname: firstname, lastname: lastname, password: password, email: email, username: username} };

            db.updateOne(Admin,query,newvalues,function(result){
                console.log("1 document updated");
            });

            res.redirect('/profileAdmin?firstname='+firstname+'&username='+username);
    }
}


module.exports = adminprofileController;
