
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Admin = require('../models/AdminModel.js');
const Reserve = require('../models/ReserveModel.js');

const mongodb = require('mongodb');



const adminprofileController = {

    
    getProfile: function (req, res) {

        
        var details = [];

        if(details.length > 0){
            details = [];
        }

        var icon = "/assets/img/admin.png";
        var query = {username: req.query.username};
    
        db.findOne(Admin, query, '', function(result) {
            details.push(result.firstname,result.lastname,result.email,result.username);
        });



    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
     MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var resultArray=[];
        var dbo = db.db("arrows-express");
        var query = {status: "Pending"};
       
       var cursor = dbo.collection("reserves").find(query);
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
        var newvalues = { $set: {status: "Approved"} };

        db.updateOne(Reserve,query,newvalues,function(result){
            res.send(true);
        });



        },

        rejectProfile: function(req,res){


            var query = req.query.id;
            var query = {_id:new mongodb.ObjectId(query)};
            var newvalues = { $set: {status: "Rejected"} };

           
            db.updateOne(Reserve,query,newvalues,function(result){
                res.send(true);
            });

            },

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

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = adminprofileController;
