const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const multiparty = require("connect-multiparty");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());



const port = 8080;
app.listen(port);

console.log("Servidor online");

//objeto de conexao com o mongo db
const db = new mongodb.Db(
    "crorjponto",
    new mongodb.Server('localhost',27017,{}),
    {}

)

//rotas
app.get("/", (req,res)=>{
    res.send({msg: "Opa!"})
})


app.post("/api", (req,res)=>{

    // res.setHeader("Access-Control-Allow-Origin",'*')
    const dados = req.body;

    console.log(dados)
    //res.send(dados)
    
    
    //testes dos dados do body
    //TODO
    
    
    db.open(function(err, mongoclient){
        mongoclient.collection("pontos", function(err,collection){
            collection.insert(dados, function(err,records){
                if(err){
                    res.json({msg: "Ocorreu um erro!"})
                }else{
                    res.json({msg: "Ponto batido!"})
                }
                mongoclient.close();
            })
        })
    })    

})