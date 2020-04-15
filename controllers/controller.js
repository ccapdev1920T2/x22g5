
/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const Login = require('../models/LoginModel.js');


const controller = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
    */
    getIndex: function (req, res) {

        res.render('login');
      
        
       
    },


    postIndex: function (req,res){

        

        var userName = req.body.userName;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("arrows-express");
            var query = { userName: userName };
            


            dbo.collection("admin").find(query).toArray(function(err, result) {

                // if (result == null){
                //     console.log("NASA RIDER AKO");
                //     dbo.collection("rider").find(query).toArray(function(err, result) {
                //     if (err) res.redirect('/');
                //     console.log("Result found: ",result);
                      
                //     var firstname =  result[0].firstName;
                //     var userName = result[0].userName;
                        
                //     res.redirect('/home?firstname='+firstname+'&userName='+userName);
                //     db.close();
            
                //  });
                // }

                // else{
                
                // console.log("NASA ADMIN AKO HAHA");
                // console.log("Result found: ",result);
                // var firstname =  result[0].firstName;
                // var userName = result[0].userName;
                // res.redirect('/admin?firstname='+firstname+'&userName='+userName);
                // db.close();

                // }
                console.log(err);
                console.log("Before result: ",result);

                if (result.length > 0){
                    console.log("Result found: ",result);
                    var firstname =  result[0].firstName;
                    var userName = result[0].userName;
                    res.redirect('/admin?firstname='+firstname+'&userName='+userName);
                    db.close();
                    
                }

                else{
                
                    console.log("NASA RIDER AKO");
                    dbo.collection("rider").find(query).toArray(function(err, result) {
                    if (err) res.redirect('/');
                    console.log("Result found: ",result);
                      
                    var firstname =  result[0].firstName;
                    var userName = result[0].userName;
                        
                    res.redirect('/home?firstname='+firstname+'&userName='+userName);
                    db.close();
            
                 });

                }
    
         });         

     
     });
      
       

    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;
