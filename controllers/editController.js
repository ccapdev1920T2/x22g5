

const Login = require('../models/LoginModel.js');
const mongodb = require('mongodb');
var details = [];

const editController = {

    
    getEdit: function (req, res) {

       

        if(details > 0){
            details = [];
        }

        details.push(req.query.firstname);
        details.push(req.query.username);


        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var resultArray=[];
            var dbo = db.db("arrows-express");
    
           
           var cursor = dbo.collection("reserve").find();
            cursor.forEach(function(doc,err){
            resultArray.push(doc);
             }, 
            
            function(){
            console.log("Details[0]: ",details[0]);
            res.render('edit-admin',{infos: resultArray,adminfirstname: details[0], adminusername: details[1],firstname: details[0], username: details[1]});   
            db.close();
    
                }); 
                
            });
           
    },

    editReserve: function (req,res){


        var query = req.query.id;
        var status = req.query.status;
        var time = req.query.time;
        var location = req.query.location;
        var date = req.query.date;

        var query = {_id:new mongodb.ObjectId(query)};

       

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                var dbo = db.db("arrows-express");
                
             var newvalues = { $set: {status: status, time:time, location:location,date:date} };
             dbo.collection("reserve").updateOne(query, newvalues, function(err, result) {
                if (err) throw err;
                            
               
                            // res.send(true);
                            console.log("PUMASOK");
                         // res.redirect('/admin?firstname='+details[0]+'&username='+details[1]);
                            
                     });
                    
            });

    },


    postEdit:  function (req, res){

        var username = req.body.usernamesearch;
        console.log("Username: ",username);

        if(username == ""){

            console.log("if pumasok");
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                if (err) throw err;
                var resultArray=[];
                if(resultArray > 0){
                    resultArray=[];
                }
                var dbo = db.db("arrows-express");
               var cursor = dbo.collection("reserve").find();
                cursor.forEach(function(doc,err){
                resultArray.push(doc);
                 }, 
                
                function(){
                    console.log("pumasok dito");
                res.render('edit-admin',{infos: resultArray,firstname: details[0], username: details[1]});   
                db.close();
        
                    }); 
                    
                });
        }

        else{

            console.log("Else pumasok");
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                if (err) throw err;
                var resultArray=[];
                if(resultArray > 0){
                    resultArray=[];
                }

                var query = {username: username};
                var dbo = db.db("arrows-express");
               var cursor = dbo.collection("reserve").find(query);
                cursor.forEach(function(doc,err){
                resultArray.push(doc);
                 }, 
                
                
                function(){
                    console.log("Result Array: ",resultArray);
                res.render('edit-admin',{infos: resultArray,firstname: details[0], username: details[1]});   
                db.close();
        
                    }); 
                    
                });

        }

    }

}


module.exports = editController;
