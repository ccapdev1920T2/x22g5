
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required:true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    priorityLevel: {
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Rider', UserSchema);
