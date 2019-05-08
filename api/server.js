const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const multiparty = require("connect-multiparty");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());



const port = 8080;
app.listen(port);

console.log("Servidor online");

//objeto de conexao com o mongo db
const db = new mongodb.Db(
    "crorjponto",
    new mongodb.Server('localhost', 27017, {}),
    {}

)

//rotas
app.post("/api/verificaSeTemPontoRegistrado", (req, res) => {
    
    const dados = req.body;

    //console.log(dados.idUsuario1)

    db.open(function(err, mongoclient){
        mongoclient.collection("pontos", function(err, collection){
            collection.find({"idUsuario": {$eq:dados.idUsuario1},"ponto":{$exists:true},"dataPonto": { $eq: dados.dataHoje1}}).toArray(function (err, results){

                if(err){
                    res.json(err);
                }else{
                    
                    if(results.length > 0){
                        //transforma o resultado em string e verifica se tem algum dado de ponto
                        var resultadoFind = JSON.stringify(results)
                        
                        if(resultadoFind.match("4000")){
                            console.log("tem ponto de chegada e almoco, volta e saida já registrado hoje")
                            
                            res.status(200).send("1000200030004000");
                        }

                        else if(resultadoFind.match("3000")){
                            console.log("tem ponto de chegada e almoco, volta já registrado hoje")
                            res.status(200).send("100020003000");
                        }
                       
                        else if(resultadoFind.match("2000")){
                            console.log("tem ponto de chegada e almoco já registrado hoje")

                            res.status(200).send("10002000");
                        }
                        
                        else if(resultadoFind.match("1000")){
                            console.log("tem ponto de chegada já registrado hoje")
                            res.status(200).send("1000");
                        } 
                        
                        mongoclient.close();

                    }
                    else{
                        //ainda nao tem ponto
                        console.log("não tem ponto registrado hj")
                        res.status(200).send("0");
                        mongoclient.close();
                    }    
                }
            })

            
        })
    })
    
    // res.send({ msg: "Opa!" });
})


app.post("/api", function (req, res) {
    
    res.setHeader("Access-Control-Allow-Origin", '*')
    const dados = req.body;
    
    console.log(dados.dataPonto)
    // res.send(dados);
    
    //testes dos dados do body
    //TODO

    db.open(function (err, mongoclient) {
        mongoclient.collection("pontos", function (err, collection) {
            //importante saber que o primeiro parametro se refere à chave do banco de dados e o segundo parametro com o objeto pesquisado
            collection.find({ "idUsuario": { $eq: dados.idUsuario },  "dataPonto": { $eq: dados.dataPonto } } ).toArray(function (err, results) {
                if (results.length > 0) {

                    //atualizo o documento
                    
                    collection.update(
                        {idUsuario:dados.idUsuario,dataPonto:dados.dataPonto},
                        { $push: {"pontoRestoDoDia":dados.ponto}
                        },
                        {},

                    function (err, records) {
                        if (err) {
                            res.json({ msg: "Ocorreu um erro!" })
                            console.log(err)
                        } else {
                            res.status(200).send("atualizado");
                            //res.json({ msg: "Ponto registrado com sucesso!" })
                        }
                        mongoclient.close();
                    })

                    console.log("tem que atualizar!")
                    mongoclient.close();
                } else {
                  //  crio um novo documento
                    collection.insert(dados, function (err, records) {
                        if (err) {
                            res.json({ msg: "Ocorreu um erro!" })
                        } else {
                            res.status(200).send("adicionado");
                            //res.json({ msg: "Ponto registrado com sucesso!" })
                        }
                        mongoclient.close();
                    })
                    console.log("tem que INSERIR")
                    mongoclient.close();


                    console.log("adicionou")
                }

            })
        })
    })


})
