var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Ger = require("./model/ger");

// var database = require("./model/database.js")


// database(mongoose);

mongoose.connect("mongodb://localhost/kachau_v2");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


//ROUTES
app.get("/",function(req, res) {
   res.send("home"); 
});

app.get("/pu/adm/register",function(req,res){
    res.render("register.ejs");
   
});

//registro de funcionario
app.post("/pu/adm/register",function(req,res){
    console.log(req.body);
    
                
    Ger.create(req.body.func, function(err){
        if(err){
            console.log("Erro");
            console.log(err);
        } else {
            console.log("User inserido com sucesso");
        }
    });
    
    res.redirect("/pu/adm/ger");
    
});


// app.get("/pu/func", function(req, res) {
//   res.render("funcLogin.ejs"); 
// });



//mostra funcionarios pro Gerente
app.get("/pu/adm/ger", function(req, res) {
   //Encontra os funcionarios no BD 
   Ger.find({},function(err,allFunc){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userManager.ejs",{users:allFunc});
           //users._id id do usuario
       }
   }).sort({Name:1}); //ordem alfabética
});

//search users ROUTE
app.post("/pu/adm/ger",function(req,res){
    console.log(req.body.func)
   
    Ger.find(req.body.func,function(err,userFind){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userManager.ejs",{users:userFind});
       }
    });
});



app.get("/pu/adm/ger/:id", function(req, res) {
   //for pra loopar entre os usarios do BD 
   Ger.findById(req.params.id,function(err,foundUser){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userEdit.ejs",{user:foundUser});
           //pegar dados dos forms e alterar no banco de dados
       }
   });
});


//update ROUTE
app.put("/pu/adm/ger/:id", function(req, res) {
   //Atualizar dados no BD
   //User.findByIdAndUpdate(ID, Obj Att, callback)
   Ger.findByIdAndUpdate(req.params.id,req.body.updateUser,function(err,foundUser){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           console.log(req.body.user);
           res.redirect("/pu/adm/ger");
       }
   });
});

//delete ROUTE
app.delete("/pu/adm/ger/:id", function(req, res){
    Ger.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            console.log("ERRO!!!!!!!!!!!!!");
            console.log(err);
        } else {
            res.redirect("/pu/adm/ger");
        }
    });
});





app.listen(process.env.PORT, process.env.IP);