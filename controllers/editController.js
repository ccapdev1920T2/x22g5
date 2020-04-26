
/*
import schemas and db
*/
const Reserve = require('../models/ReserveModel.js');
const mongodb = require('mongodb');
const db = require('../models/db.js');

var details = [];

const editController = {

    
    getEdit: function (req, res) {

       /*
            empties the value of details to avoid
            data redundancy whenever a data is pushed
       */

        if(details!=null){
            details = [];
        }

       
        details.push(req.query.firstname);
        details.push(req.query.username);


        /*
            it gets all info from each data in
            the reserves collection and pushes
            everything to resultArray
        */
        var MongoClient = require('mongodb').MongoClient;
        //var url = "mongodb://localhost:27017/";
        var url = "mongodb+srv://arrows_express:password123!@cluster0-i9vbi.mongodb.net/test?retryWrites=true&w=majority";
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var resultArray=[];
            var dbo = db.db("arrows-express");
    
           
           var cursor = dbo.collection("reserves").find();
            cursor.forEach(function(doc,err){
            resultArray.push(doc);
             }, 
            /*
                renders all details in edit-admin.hbs
            */
            function(){
            res.render('edit-admin',{infos: resultArray,adminfirstname: details[0], adminusername: details[1],firstname: details[0], username: details[1]});   
            db.close();
    
                }); 
                
            });
           
    },

    /*
        it updates all info from collection reserves
        of a specific user
    */

    editReserve: function (req,res){


        var query = req.query.id;
        var status = req.query.status;
        var time = req.query.time;
        var location = req.query.location;
        var date = req.query.date;

        var query = {_id:new mongodb.ObjectId(query)};
        var newvalues = { $set: {status: status, time:time, location:location,date:date} };
       
        db.updateOne(Reserve,query,newvalues,function(result){
            
        });

    },


    postEdit:  function (req, res){

        var username = req.body.usernamesearch;
    
        /*
            if the button of search bar for username is clicked
            and the input for the username is empty, it displays 
            all data from the collection reserves. The purpose of 
            this is to bring back all values if the admin wants to 
            show all data after searching for a specific user
        */

        if(username == ""){

   
            var MongoClient = require('mongodb').MongoClient;
            //var url = "mongodb://localhost:27017/";
            var url = "mongodb+srv://arrows_express:password123!@cluster0-i9vbi.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                if (err) throw err;
                var resultArray=[];
                if(resultArray > 0){
                    resultArray=[];
                }
                var dbo = db.db("arrows-express");
               var cursor = dbo.collection("reserves").find();
                cursor.forEach(function(doc,err){
                resultArray.push(doc);
                 }, 
                
                function(){
                
                res.render('edit-admin',{infos: resultArray,firstname: details[0], username: details[1]});   
                db.close();
        
                    }); 
                    
                });
        }

        /*
            if the admin searches for the reservation of a 
            specific user, it display all of the user's 
            reservations
        */

        else{

            var MongoClient = require('mongodb').MongoClient;
            //var url = "mongodb://localhost:27017/";
            var url = "mongodb+srv://arrows_express:password123!@cluster0-i9vbi.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
                if (err) throw err;
                var resultArray=[];
                if(resultArray > 0){
                    resultArray=[];
                }

                var query = {username: username};
                var dbo = db.db("arrows-express");
               var cursor = dbo.collection("reserves").find(query);
                cursor.forEach(function(doc,err){
                resultArray.push(doc);
                 }, 
                
                
                function(){
                res.render('edit-admin',{infos: resultArray,firstname: details[0], username: details[1]});   
                db.close();
        
                    }); 
                    
                });

        }

    }

}


module.exports = editController;
