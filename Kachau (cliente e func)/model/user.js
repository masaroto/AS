var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
        Name: String, 
        LastName: String, 
        Email: String,
        Password: String,
        Adress: String, 
        Adress2: String, 
        City: String, 
        State: String, 
        CEP: String 
});

module.exports = mongoose.model("user",userSchema);