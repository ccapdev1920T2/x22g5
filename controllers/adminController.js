
const adminController = {

    /*
        loads the home page of admin, gets the values of
        firstname and username from the url and renders the 
        data in home-admin.hbs
    */
    
    getAdmin: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username

        }
        res.render('home-admin',details);      
    }

}


module.exports = adminController;
