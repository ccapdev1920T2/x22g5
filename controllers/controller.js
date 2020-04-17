
const Login = require('../models/LoginModel.js');


const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },


    getIndex: function (req, res) {

        res.render('login');
          
    },


    postIndex: function (req,res){

        var username = req.body.username;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = { username: username };
            


            dbo.collection("admin").find(query).toArray(function(err, result) {


                if (result.length > 0){
                   
                    var firstname =  result[0].firstname;
                    var username = result[0].username;
                    res.redirect('/admin?firstname='+firstname+'&username='+username);
                    db.close();
                    
                }
                else{
                
                    dbo.collection("rider").find(query).toArray(function(err, result) {
                    if (err) res.redirect('/');                 
                    var firstname =  result[0].firstname;
                    var username = result[0].username;

                    console.log("Firstname: ",result[0].firstname);
                    console.log("Username: ",result[0].username);

                        
                    res.redirect('/home?firstname='+firstname+'&username='+username);

                    db.close();
            
                 });

                }  
         });         

     
     });
      
       

    }
}

module.exports = controller;
