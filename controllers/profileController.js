
// import db
const db = require('../models/db.js');

// import Rider and Reserve Schema
const Rider = require('../models/UserModel.js');
const Reserve = require('../models/ReserveModel.js');

//import mongodb
const mongodb = require('mongodb');


const profileController = {

    /*
        renders profile of user 
    */

    getProfile: function (req, res) {

        var icon = "/assets/img/rider.png";
        var query = {username: req.query.username};

        var details = [];

        if(details.length > 0){
           details = [];
        }

        /*
            finds the username of the user in 
            the collection riders and pushes
            all details to details array
        */

        db.findOne(Rider, query, '', function(result) {

            //descriptions for priority

            if(result.priorityLevel == 1){
                var desc = "Faculty and ASF with Inter-Campus assignments";
            }
            if(result.priorityLevel == 2){
                var desc = "Students with Inter-Campus enrolled subjects or thesis";
            }
            if(result.priorityLevel == 3){
                var desc = "Researchers";
            }
            if(result.priorityLevel == 4){
                var desc = "School administrators";
            }
            if(result.priorityLevel == 5){
                var desc = "Employees and Students with Official Business";
            }

            details.push(result.firstname,result.lastname,result.password,result.email,result.username,
                result.priorityLevel,desc);
           
              
        });

        /*
            displays all reservations of the user
            by getting all the data from the 
            collection reserves
        */

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var resultArray=[];
        var dbo = db.db("arrows-express");
        var query = {username: req.query.username};

       
        var cursor = dbo.collection("reserves").find(query);
        cursor.forEach(function(doc,err){
        resultArray.push(doc);

         }, 
        /*
            renders all data to profile.hbs
        */
        function(){
        console.log("Details: ", details);
        res.render('profile',{items: resultArray, firstname: details[0], lastname: details[1],password: details[2],
                            email: details[3], username: details[4],priority: details[5], prioritydesc: details[6], icon: icon});

            }); 
            
        });


    },

    /*
        deletes a reservation by getting
        the id of a specific reservation
    */

      deleteProfile: function(req,res){


                var query = req.query.id;

                var query = {_id:new mongodb.ObjectId(query)};

              
                     db.deleteOne(Reserve,query,function(result){
                         res.send(true);
                     });
       
                
                
    },
    /*
        if a user wants to update his/her profile
        also updates the username from the collection
        reserves by corresponding it to the new username

        Note: all input fields must be populated
    */
    postProfile: function (req,res){

        var query = {username: req.query.username};
        var username = req.query.username;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;

        var newvalues = { $set: {firstname: firstname, lastname: lastname, password: password, email: email, username: username} };
        var newuser = { $set: {username: username} };

        db.updateOne(Rider,query,newvalues,function(result){
            if(result!=null){
                db.updateMany(Reserve,query,newuser,function(result){
                });
            }
        });

        res.redirect('/profile?firstname='+firstname+'&username='+username);

    }

}


module.exports = profileController;
