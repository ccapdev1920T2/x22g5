
// import module `database` from `../models/db.js`
const db = require('../models/db.js');
const Reserve = require('../models/ReserveModel.js');


/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const reserveadminController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getadminReserve: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
        // query where `idNum` is equal to URL parameter `idNum`
        res.render('reserve-admin',details);
      
    },

    postadminReserve: function(req,res){

        console.log("PUMASOK ADMIN");

        var userName = req.query.username;
        var firstname = req.query.firstname;
         var username = req.body.riderusername;
         var date = req.body.date;
         var time = req.body.time;
         var location = req.body.destination;
         var comment = req.body.comment;

         console.log(username);
        
         var user = {
            username: username,
            comment: comment,
            date: date,
            location: location, 
            time: time, 
            status: "Approved"
        }

        //  var MongoClient = require('mongodb').MongoClient;
        //  var url = "mongodb://localhost:27017/";
 
        //  MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {

        //     if (err) throw err;
        //     var dbo = db.db("arrows-express");
        //     dbo.collection("reserve").insertOne(user, function(err, res) {
        //         if (err) throw err;
        //         console.log("1 document inserted");
        //         db.close();
        
        //     });

        //  });

        db.insertOne(Reserve, user, function(flag) {
            if(flag){
                console.log("1 document added");
            }

        });
        
         res.redirect('/admin?firstname='+firstname+'&username='+userName);
    }
}



/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = reserveadminController;
