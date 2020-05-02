
const homeController = {

    /*
        home page for the user
        renders home.hbs by getting
        the user's firstname and username
        from the url
    */
    getHome: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
  
        res.render('home',details);
      
    }
}


module.exports = homeController;
