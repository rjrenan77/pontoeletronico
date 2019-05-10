var ObjectID = require("mongodb").ObjectID;

module.exports.verificaPonto = function(application,req,res){

    let connection = application.config.dbConnection;

    // console.log("===>"+ObjectID(req.session._id));

    var dados = req.body;
    dados.idUsuario1 = req.session._id;
   
    //console.log(dados.idUsuario1)

    connection().open(function(err, mongoclient){
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
}

module.exports.inserePonto = function(application,req,res){

    let usuario = req.session.usuario;
    var _id = req.session._id;

    console.log(_id)

    let connection = application.config.dbConnection;

    res.setHeader("Access-Control-Allow-Origin", '*')
    var dados = req.body;
    dados.idUsuario = _id.toString();
    // console.log(dados.idUsuario)
    
    //console.log(dados.dataPonto)
    // res.send(dados);
    
    //testes dos dados do body
    //TODO

    connection().open(function (err, mongoclient) {
        mongoclient.collection("pontos", function (err, collection) {
            //importante saber que o primeiro parametro se refere à chave do banco de dados e o segundo parametro com o objeto pesquisado
            collection.find({ "idUsuario": { $eq: dados.idUsuario },  "dataPonto": { $eq: dados.dataPonto } } ).toArray(function (err, results) {
                if (results.length > 0) {

                    //atualizo o documento
                    
                    collection.update(
                        {idUsuario:_id,dataPonto:dados.dataPonto},
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
}

module.exports.autenticar = function(application,req,res){
    var dadosForm = req.body;

    //console.log(dadosForm)

    req.assert("usuario").notEmpty();
    req.assert("senha").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        //ver como vai tratar erros
        res.status(401).send("401")
        return
    }
    
    let connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

    UsuarioDAO.autenticar(dadosForm, req,res);



    //res.status(200).send("tudo ok para criar a sessao")
}

module.exports.sair = function(application,req,res){
    req.session.destroy(function(err){
        
        res.status(200).send("destruida");

    })
}