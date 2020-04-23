

const db = require('../models/db.js');
const Reserve = require('../models/ReserveModel.js');

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

            db.insertOne(Reserve, details, function(flag) {
                    if(flag){
                        console.log("1 document added");
                    }
            });
                res.redirect('/home?firstname='+firstname+'&username='+username);

    }

}

module.exports = reserveController;
