


const successController = {

   
    getSuccess: function (req, res) {


        var details = {
            firstname: req.query.firstname,
            username: req.query.username
        }
  
        res.render('success',details);
      
    }
}


module.exports = successController;
