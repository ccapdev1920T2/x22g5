
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Rider = require('../models/UserModel.js');
const Reserve = require('../models/ReserveModel.js');


const mongodb = require('mongodb');


const profileController = {


    getProfile: function (req, res) {

        var icon = "/assets/img/rider.png";
        var query = {username: req.query.username};

        var details = [];

        if(details.length > 0){
           details = [];
        }

        db.findOne(Rider, query, '', function(result) {
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

        //FOR TABLE
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
        
        function(){
        console.log("Details: ", details);
        res.render('profile',{items: resultArray, firstname: details[0], lastname: details[1],password: details[2],
                            email: details[3], username: details[4],priority: details[5], prioritydesc: details[6], icon: icon});

            }); 
            
        });


    },

      deleteProfile: function(req,res){


                var query = req.query.id;

                var query = {_id:new mongodb.ObjectId(query)};

              
                     db.deleteOne(Reserve,query,function(result){
                         res.send(true);
                     });
       
                
                
    },

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
