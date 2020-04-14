
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

var details = 0;
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
        


        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = {userName: req.query.userName};
            console.log("Nasa get profile");
            // console.log("Username: ",req.query.userName);
            dbo.collection("rider").find(query).toArray(function(err, result) {
            if (err) throw err;
          //  console.log("Result found: ",result);

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
          
             details = {
                firstname: result[0].firstName,
                lastname: result[0].lastName,
                email: result[0].email,
                username: result[0].userName,
                password: result[0].password,
                priority: result[0].priorityLevel,
                prioritydesc: desc
            };   

           // res.render('profile',details);
            db.close();

     }); 
   


     });

     //for table
     MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var resultArray=[];
        var dbo = db.db("arrows-express");
        var query = {userName: req.query.userName};

        console.log("Nasa table ako");
       var cursor = dbo.collection("registration").find(query);
        cursor.forEach(function(doc,err){
       resultArray.push(doc);

         }, function(){

        console.log(details);
        var info=[];
        for(var i in details)
            info.push([i,details[i]]);
       res.render('profile',{items: resultArray, detail: info});
       db.close();
            }); 
       });
   
      
    },



    postProfile: function (req,res){


        var username = req.query.userName;
        var userName = req.body.username;
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrows-express");
        var query = { userName: username};

        var newvalues = { $set: {firstName: firstName, lastName: lastName, password: password, email: email, userName: userName} };
        dbo.collection("rider").updateOne(query, newvalues, function(err, res) {
         if (err) throw err;
            console.log("1 document updated");
            db.close();
         });
        });

        res.redirect('/profile?firstname='+firstName+'&userName='+userName);
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;
