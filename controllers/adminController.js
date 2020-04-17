
/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const Login = require('../models/LoginModel.js');


const adminController = {

    
    getAdmin: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username

        }
        res.render('home-admin',details);      
    }

}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = adminController;
