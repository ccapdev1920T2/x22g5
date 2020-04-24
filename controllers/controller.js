
const Rider = require('../models/UserModel.js');
const Admin = require('../models/AdminModel.js');

const db = require('../models/db.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },


    getIndex: function (req, res) {

        res.render('login');
          
    },


    postIndex: function (req,res){

        var username = req.body.username;
        var query = {username: username};
    
            db.findOne(Admin, query, '', function(result) {
                if(result!=null){
                
                    var firstname = result.firstname;
                    var username = result.username;
                    res.redirect('/admin?firstname='+firstname+'&username='+username);

                }
                else{
                        db.findOne(Rider, query, '', function(result) {
                        if(result == null){
                            res.redirect('/');
                        }
                        var firstname = result.firstname;
                        var username = result.username;
                        res.redirect('/home?firstname='+firstname+'&username='+username);
                        });
                        
                        // Try!
                        // db.findOne(Rider, query, '', function(err, result){
                        //     if(err){
                        //         res.redirect('/', {error: 'Wrong username or password!'});
                        //     } if(result == null) {
                        //         res.redirect('/', {error: 'Wrong username or password!'});
                        //     } else {
                        //         var firstname = result.firstname;
                        //         var username = result.username;
                        //         res.redirect('/home?firstname='+firstname+'&username='+username);
                        //     }
                        // });
                }
                
            });

    
       

    }
}

module.exports = controller;
