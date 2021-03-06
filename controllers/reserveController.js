//import db and Reserve Schema
const db = require('../models/db.js');
const Reserve = require('../models/ReserveModel.js');

const reserveController = {

    /*
        renders the reserve page for user
    */
    getReserve: function (req, res) {

        
        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
      
        res.render('reserve',details);
       
      
    },
    /*
        adds the user's reservation in the
        collection reserves, status is set
        to "Pending"
    */
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

             db.insertOne(Reserve, details, function(flag) {
                    if(flag){
                        console.log("1 document added");
                    }
            });
                res.redirect('/reserveSuccess?firstname='+firstname+'&username='+username);

    }

}

module.exports = reserveController;
