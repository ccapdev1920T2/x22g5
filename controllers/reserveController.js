
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`


/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const reserveController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getReserve: function (req, res) {

        
        // query where `idNum` is equal to URL parameter `idNum`
        var details = {
            firstname: req.query.firstname,
            userName: req.query.userName
        }
        // query where `idNum` is equal to URL parameter `idNum`
        res.render('reserve',details);
       
      
    },

    postReserve: function (req,res){

     

            var username = req.query.userName;
            var firstname = req.query.firstname;
            var comment = req.body.comment;
            var date = req.body.date;
            var destination = req.body.destination;
            var time = req.body.time;

            console.log("Destination: ",destination);

            var details = {
                userName: username,
                comment: comment,
                date: date,
                destination: destination,
                time: time
            }

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
    
                MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("arrows-express");
                    dbo.collection("reserve").insertOne(details, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
            
                });
            });

            
                res.redirect('/home?firstname='+firstname+'&userName='+username);

    }

}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = reserveController;
