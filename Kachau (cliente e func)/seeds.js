var mongoose = require("mongoose");
var Prod = require("./model/prod");

var link = "http://transparency.greatheartsacademies.org/wp-content/uploads/sites/38/2018/10/default-placeholder.png"

function seeds(){
    
    for (var i = 0; i < 5; i++) {
        var produto = {
            name: "Produto "+i, 
            desc: "Descrição sobre o produto aqui, suas especificações", 
            preco: 230,
            img: link,
            qtd: 10
        }

        Prod.create(produto, function(err){
            if(err){
                console.log("ERRO!!!!!!!!!!")
            }else{
                console.log("Produto " + produto.name + " inserido com sucesso");
            }
        });
    }
}
module.exports = seeds;