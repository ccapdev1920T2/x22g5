

const db = require('../models/db.js');

const User = require('../models/UserModel.js');


const homeController = {

   
    getHome: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
  
        res.render('home',details);
      
    }
}


module.exports = homeController;
