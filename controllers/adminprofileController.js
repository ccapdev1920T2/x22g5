
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const mongodb = require('mongodb');



const adminprofileController = {

    
    getProfile: function (req, res) {

        
        var details = [];

        if(details.length > 0){
            details = [];
        }

        var icon = "/assets/img/admin.png";
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = {username: req.query.username};
            console.log("username: ",req.query.username);
            dbo.collection("admin").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("Result found: ",result);


            details.push(result[0].firstname,result[0].lastname,result[0].email,result[0].username);
            
            db.close();

     });
     
     });

     MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var resultArray=[];
        var dbo = db.db("arrows-express");
        var query = {status: "Pending"};
       
       var cursor = dbo.collection("reserve").find(query);
        cursor.forEach(function(doc,err){
        resultArray.push(doc);

         }, 
        
        function(){
        res.render('profile-admin',{infos: resultArray, firstname: details[0], lastname: details[1],email: details[2],
                            username: details[3],icon: icon});
        db.close();

            }); 
            
        });
   

    
      
    },

    approveProfile: function(req,res){


        var query = req.query.id;
        var query = {_id:new mongodb.ObjectId(query)};

       

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                var dbo = db.db("arrows-express");
                
             var newvalues = { $set: {status: "Approved"} };
             dbo.collection("reserve").updateOne(query, newvalues, function(err, result) {
                if (err) throw err;
                            
               
                            res.send(true);
                            
                     });
                    
            });
        },

        rejectProfile: function(req,res){


            var query = req.query.id;
            var query = {_id:new mongodb.ObjectId(query)};
    
           
    
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            
                MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                    var dbo = db.db("arrows-express");
                    
                 var newvalues = { $set: {status: "Rejected"} };
                 dbo.collection("reserve").updateOne(query, newvalues, function(err, result) {
                    if (err) throw err;
    
                                res.send(true);
                                
                         });
                        
                });
            },

    postProfile: function (req,res){


        var username = req.query.username;
        var username = req.body.username;
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrows-express");
        var query = { username: username};

        var newvalues = { $set: {firstName: firstName, lastName: lastName, password: password, email: email, username: username} };
        dbo.collection("admin").updateOne(query, newvalues, function(err, res) {
         if (err) throw err;
            console.log("1 document updated");
            db.close();
         });
        });

        res.redirect('/profileAdmin?firstname='+firstName+'&username='+username);
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = adminprofileController;
