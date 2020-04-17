

const db = require('../models/db.js');

const reserveController = {

  
    getReserve: function (req, res) {

        
        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
      
        res.render('reserve',details);
       
      
    },

    postReserve: function (req,res){

     

            var username = req.query.username;
            var firstname = req.query.firstname;
            var comment = req.body.comment;
            var date = req.body.date;
            var destination = req.body.destination;
            var time = req.body.time;
   

            var details = {
                username: username,
                comment: comment,
                date: date,
                location: destination,
                time: time,
                status: "Pending"
            }

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
    
                MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("arrows-express");
                    dbo.collection("reserve").insertOne(details, function(err, res) {
                    if (err) throw err;
                    
                    db.close();
            
                });
            });



              
                res.redirect('/home?firstname='+firstname+'&username='+username);

    }

}

module.exports = reserveController;
