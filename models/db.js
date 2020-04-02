// Imports
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Creating db
const dbname = "arrows_express";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNMewUrlParser : true};

//Node js and Mongodb server connection

const state = {
    db : null
};

const connect = (cb) => {
    if(state.db)
        cb();
    else{
        MongoClient.connect(url, mongoOptions,(err, client)=>{
            if (err)
                cb(err);
                else {
                    state.db = client.db(dbname);
                    cb();
                }
            
        });
    }
}

//PrimaryKey Retrieval
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

//Database Retrieval
const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};

