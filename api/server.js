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
app.get("/", (req, res) => {
    res.send({ msg: "Opa!" });
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
                        } ,
                        {},

                    function (err, records) {
                        if (err) {
                            res.json({ msg: "Ocorreu um erro!" })
                            console.log(err)
                        } else {
                            res.status(200).send("atualizar");
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
                            res.status(200).send("adicionar");
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

function retornaDataAtualSeExistirNoBanco(dados){

    db.open(function (err, mongoclient) {
        mongoclient.collection("pontos", function (err, collection) {
            //importante saber que o primeiro parametro se refere à chave do banco de dados e o segundo parametro com o objeto pesquisado
            collection.find({ "dataPonto": { $eq: dados.dataPonto } }).toArray(function (err, results) {
                
                var dataJaExiste = 0;
                console.log(results)
                if(results.length>0){// const data =  "data é igual a de hoje"
                    console.log("data é igual a de hoje")
                    mongoclient.close();
                    return dataJaExiste = 1; 
                }
                else
                    console.log("data nao é igual a de hoje")
                    mongoclient.close();
                    return dataJaExiste;
            })
        })
    })

}