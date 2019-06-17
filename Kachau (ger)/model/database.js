module.exports = function(mongoose){
    mongoose.connect("mongodb://localhost/kachau");
    
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
    
    var User = mongoose.model("user",userSchema);
};