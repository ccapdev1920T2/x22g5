
/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const Login = require('../models/LoginModel.js');


const editController = {

    
    getEdit: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.userName

        }
        res.render('edit-admin',details);      
    }

}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = editController;
