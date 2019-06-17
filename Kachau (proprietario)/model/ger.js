var mongoose = require("mongoose");

var funcSchema = new mongoose.Schema({
        Name: String, 
        LastName: String, 
        Email: String,
        Password: String,
        CPF: String,
        Telefone: String
        
});
    

module.exports = mongoose.model("ger",funcSchema);