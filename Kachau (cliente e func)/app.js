var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./model/user");
var Prod = require("./model/prod");
var seeds = require("./seeds");


mongoose.connect("mongodb://localhost/kachau_v2");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

//func de teste
// seeds();
var prodList = [];

// ===================================== Lado do cliente ==================================
app.get("/",function(req, res) {
    Prod.find({}, function(err, allProd) {
        if(err){
            console.log(err);
        } else{
            res.render("home", {prods:allProd}); 
        }
    });
   
});


app.get("/carrinho", function(req, res) {
    res.render("cart", {prods:prodList}); 
});

app.post("/cart", function(req, res) {
    console.log(prodList);
   
    console.log(prodList);
    Prod.findOne({name:req.body.prod}, function(err, prodFound) {
        if(err){
            console.log(err);
        } else {
            prodList.push(prodFound);
            
            res.render("cart", {prods:prodList});
        }
    });

    
});


app.post("/itemDelete", function(req, res) {
   var prodId = req.body.prod;
   
   prodList.forEach(function(prod){
      if(prod._id == prodId){
          var index = prodList.indexOf(prod);
        if (index > -1) {
          prodList.splice(index, 1);
        }
      } 
   });
   res.render("cart", {prods:prodList});
});


app.get("/compra", function(req, res) {
    prodList = [];
    res.send("compra finalizada");
});


app.get("/ticket", function(req, res) {
   res.render("ticket"); 
});


app.get("/ticketEnviado", function(req, res) {
   res.send("ticket Enviado"); 
});

app.get("/register",function(req,res){
    res.render("register.ejs");
});

app.post("/register",function(req,res){
    console.log(req.body);
    var UserName= req.body.UserName; 
    var UserLastName= req.body.UserLastName; 
    var UserEmail= req.body.UserEmail; 
    var UserPassword = req.body.UserPassword; 
    var UserAddress= req.body.UserAddress; 
    var UserAddress2 = req.body.UserAddress2; 
    var UserCity = req.body.UserCity; 
    var UserState = req.body.UserState; 
    var UserCEP = req.body.UserCEP;
    
    var newUser = {Name: UserName,
                LastName: UserLastName,
                Email: UserEmail,
                Password: UserPassword,
                Adress: UserAddress, 
                Adress2: UserAddress2, 
                City: UserCity, 
                State: UserState, 
                CEP: UserCEP}
                
    User.create(newUser,function(err){
        if(err){
            console.log("Erro");
            console.log(err);
        } else {
            console.log("User inserido com sucesso");
        }
    });
    
    res.redirect("/pu/func/id/users");
    
});

app.post("/login", function(req, res) {
    res.send("Usuario logado");
});



// ========================================== funcionario ======================================



app.get("/pu/func", function(req, res) {
   res.render("funcLogin.ejs"); 
});

//show users to functionary
app.get("/pu/func/:id/users", function(req, res) {
   //for pra loopar entre os usarios do BD 
   User.find({},function(err,allUsers){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userManager.ejs",{users:allUsers});
           //users._id id do usuario
       }
   }).sort({Name:1}); //ordem alfabética
});

//search users ROUTE
app.post("/pu/func/:id/users",function(req,res){
    console.log(req.body.searchUser)
   var user = req.body.searchUser;
   User.find({Name:user},function(err,userFind){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           res.render("userManager.ejs",{users:userFind});
       }
   });
});

app.get("/pu/func/register/prod", function(req, res) {
    res.render("prodRegister");
});

app.post("/pu/func/register/prod", function(req, res) {
    Prod.create(req.body.produto, function(err, produto){
        if(err){
            console.log("ERRO!!!!!!!!!!");
        }else{
            console.log("Produto " + produto.name + " inserido com sucesso");
        }
    });
});

app.get("/pu/func/prod", function(req, res) {
    Prod.find({}, function(err, allProd) {
        if(err){
            console.log(err);
        } else {
            res.render("prods", {prods:allProd});
        }
    });
    
});

app.get("/pu/func/prod/:id", function(req, res) {
    Prod.findById(req.params.id,function(err,foundProd){
       if(err){
           console.log(err);
       } else {
           res.render("prodEdit.ejs",{prod:foundProd});
           //pegar dados dos forms e alterar no banco de dados
       }
   });
    
});

app.post("/update/produto/:id", function(req, res) {
    Prod.findByIdAndUpdate(req.params.id,req.body.produto,function(err,foundUser){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           console.log(req.body.user);
           res.redirect("/pu/func/prod");
       }
   });
});

app.delete("/pu/func/prod/:id", function(req, res) {
    Prod.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/pu/func/prod");
        }
    });
});

app.get("/pu/func/:idFunc/users/:id", function(req, res) {
   //for pra loopar entre os usarios do BD 
   User.findById(req.params.id,function(err,foundUser){
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
app.put("/pu/func/:idFunc/users/:id", function(req, res) {
   //Atualizar dados no BD
   //User.findByIdAndUpdate(ID, Obj Att, callback)
   User.findByIdAndUpdate(req.params.id,req.body.updateUser,function(err,foundUser){
       if(err){
           console.log("Erro!!!!");
           console.log(err);
       } else {
           console.log(req.body.user);
           res.redirect("/pu/func/id/users/");
       }
   });
});

//delete ROUTE
app.delete("/pu/func/:idFunc/users/:id", function(req, res){
    User.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            console.log("ERRO!!!!!!!!!!!!!")
            console.log(err);
        } else {
            res.redirect("/pu/func/id/users/");
        }
    });
});


app.listen(process.env.PORT, process.env.IP);