
//import db and Reserve Schema
const db = require('../models/db.js');
const Reserve = require('../models/ReserveModel.js');
const Rider = require('../models/UserModel.js');

const reserveadminController = {

    /*
        renders the reserve-admin hbs
    */
   
    getadminReserve: function (req, res) {


        if(req.query.err){
            res.render('reserve-admin',{err: "User does not exist",firstname:req.query.firstname,
                                                username: req.query.username});
        }
        else{
            var details = {
                firstname: req.query.firstname,
                username: req.query.username
            }
           
            res.render('reserve-admin',details);
          
        }
        
    },

    /*
        if the admin reserves for a user
        status is automatically set to approve

    */

    postadminReserve: function(req,res){


         var userName = req.query.username;
         var firstname = req.query.firstname;
         var username = req.body.riderusername;
         var date = req.body.date;
         var time = req.body.time;
         var location = req.body.destination;
         var comment = req.body.comment;

         var query = {username: username};

        /*
            searches if the user input from the admin
            exists in the collection riders
        */
         db.findOne(Rider, query, '', function(result) {
            /*
                if rider does not exist, display error
            */
            if(result == null){
            console.log("User does not exist");
            res.redirect('/reserveAdmin?firstname='+firstname+'&username='+userName+'&err="userError"');
            }
            /*
                if user exists, add reservation to the collection
                reserves, the status will be automatically approved
            */
            else{
                var user = {
                    username: username,
                    comment: comment,
                    date: date,
                    location: location, 
                    time: time, 
                    status: "Approved"
                }
        
                db.insertOne(Reserve, user, function(flag) {
                    if(flag){
                        console.log("1 document added");
                    }
                });
                
                 res.redirect('/reserveAdminSuccess?firstname='+firstname+'&username='+userName);

            }
         });
        
    }
}


module.exports = reserveadminController;
