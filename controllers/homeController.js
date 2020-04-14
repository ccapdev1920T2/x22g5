
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const homeController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getHome: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            userName: req.query.userName
        }
        // query where `idNum` is equal to URL parameter `idNum`
        res.render('home',details);
      
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = homeController;
