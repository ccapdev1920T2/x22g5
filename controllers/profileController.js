
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const mongodb = require('mongodb');






/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const profileController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile: function (req, res) {

        
        
        var details = [];

        if(details.length > 0){
           details = [];
        }

        var icon = "/assets/img/rider.png";
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = {username: req.query.username};
           
            
            dbo.collection("rider").find(query).toArray(function(err, result) {
            if (err) throw err;
       

            if(result[0].priorityLevel==1){
                var desc = "Faculty and ASF with Inter-Campus assignments";
            }
            if(result[0].priorityLevel==2){
                var desc = "Students with Inter-Campus enrolled subjects or thesis";
            }
            if(result[0].priorityLevel==3){
                var desc = "Researchers";
            }
            if(result[0].priorityLevel==4){
                var desc = "School administrators";
            }
            if(result[0].priorityLevel==5){
                var desc = "Employees and Students with Official Business";
            }
          

            details.push(result[0].firstname,result[0].lastname,result[0].email,result[0].username,
                result[0].password,result[0].priorityLevel,desc);

                console.log("Details: ",details);
    
            db.close();



     }); 
   


     });

     //for table
     MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var resultArray=[];
        var dbo = db.db("arrows-express");
        var query = {username: req.query.username};

       
       var cursor = dbo.collection("reserve").find(query);
        cursor.forEach(function(doc,err){
        resultArray.push(doc);

         }, 
        
        function(){
        res.render('profile',{items: resultArray, firstname: details[0], lastname: details[1],email: details[2],
                            username: details[3], password: details[4],priority: details[5], prioritydesc: details[6], icon: icon});
        db.close();

            }); 
            
        });
   
      
    },


    deleteProfile: function(req,res){


                var query = req.query.id;

                var query = {_id:new mongodb.ObjectId(query)};

                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/";
                
                    MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                        var dbo = db.db("arrows-express");
                        dbo.collection("reserve").deleteOne(query,function(err, result) {
                         
                            res.send(true);

                        });

                    });
    },


    postProfile: function (req,res){


        var username = req.query.username;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrows-express");
        var query = { username: username};

        var newvalues = { $set: {firstname: firstname, lastname: lastname, password: password, email: email, username: username} };
        dbo.collection("rider").updateOne(query, newvalues, function(err, res) {
         if (err) throw err;
         
            db.close();
         });
        });



        res.redirect('/profile?firstname='+firstName+'&username='+username);
    }

}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;
