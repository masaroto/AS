var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Prod = require("./model/prod");
var Func = require("./model/func");

// var database = require("./model/database.js")


// database(mongoose);

mongoose.connect("mongodb://localhost/kachau_v2");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");


//ROUTES
app.get("/",function(req, res) {
   res.send("home"); 
});

app.get("/register",function(req,res){
    res.render("register.ejs");
   
});

//registro de funcionario
app.post("/register",function(req,res){
    console.log(req.body);

    Func.create(req.body.func,function(err){
        if(err){
            console.log("Erro");
            console.log(err);
        } else {
            console.log("User inserido com sucesso");
        }
    });
    
    res.redirect("/pu/ger/func");
    
});


// app.get("/pu/func", function(req, res) {
//   res.render("funcLogin.ejs"); 
// });



//mostra funcionarios pro Gerente
app.get("/pu/ger/func", function(req, res) {
   //Encontra os funcionarios no BD 
   Func.find({},function(err,allFunc){
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
app.post("/pu/ger/func",function(req,res){
    console.log(req.body.func)
   
    Func.find(req.body.func,function(err,userFind){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userManager.ejs",{users:userFind});
       }
    });
});


app.get("/pu/ger/rel/vendas", function(req, res) {
   res.render("relVendas");
});


app.get("/pu/ger/rel/usuarios", function(req, res) {
   res.render("relUsuarios");
});


app.get("/pu/ger/rel/estoque", function(req, res) {
    Prod.find({},function(err,allProd){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("relEstoque",{prods:allProd});
       }
   }).sort({qtd:1});
});


app.get("/pu/ger/func/:id", function(req, res) {
   //for pra loopar entre os usarios do BD 
   Func.findById(req.params.id,function(err,foundUser){
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
app.put("/pu/ger/func/:id", function(req, res) {
   //Atualizar dados no BD
   //User.findByIdAndUpdate(ID, Obj Att, callback)
   Func.findByIdAndUpdate(req.params.id,req.body.updateUser,function(err,foundUser){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           console.log(req.body.user);
           res.redirect("/pu/ger/func");
       }
   });
});

//delete ROUTE
app.delete("/pu/ger/func/:id", function(req, res){
    Func.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            console.log("ERRO!!!!!!!!!!!!!");
            console.log(err);
        } else {
            res.redirect("/pu/ger/func");
        }
    });
});





app.listen(process.env.PORT, process.env.IP);