var mongoose = require("mongoose");

var prodSchema = new mongoose.Schema({
        name: String, 
        desc: String, 
        preco: Number,
        img: String,
        qtd: Number
});
    

module.exports = mongoose.model("prod",prodSchema);