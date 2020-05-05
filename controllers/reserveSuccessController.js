const reserveSuccessController = {

    /*
        redirects to home for admin
    */
   getReserveSuccessAdmin: function (req, res) {
        var details = {
            firstname: req.query.firstname,
            username: req.query.username

        }
        res.render('reserve-success-admin',details);
    },

    /*
        redirects to home
    */
    getReserveSuccess: function (req,res){
        var details = {
            firstname: req.query.firstname,
            username: req.query.username

        }
        res.render('reserve-success',details);
    }

}

module.exports = reserveSuccessController;
