const ObjectID = require("mongodb").ObjectID


module.exports.login = function (application, req, res) {
    res.render("login")
}

module.exports.logon = function (application, req, res) {
    var dadosForm = req.body;

    req.assert("usuario").notEmpty();
    req.assert("senha").notEmpty();

    var erros = req.validationErrors();

    //VALIDAR CAMPOS
    if (erros) {
        res.status(401).send("invalido");
        return
    }

    //VALIDAR SE DADOS EXISTEM NO BANCO
    var connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

    UsuarioDAO.autenticarPainel(dadosForm, req, res);

}

module.exports.index = function (application, req, res) {
    if (req.session.autorizado) {

        res.render("index")
    } else {
        res.render("naoAutenticado")
    }
}

module.exports.cadastrarFuncionario = function (application, req, res) {

    if (req.session.autorizado)
        res.render("cadastrarFuncionario")
    else
        res.render("naoAutenticado")
}

module.exports.cadastrarAdministrador = function (application, req, res) {

    if (req.session.autorizado)
        res.render("cadastrarAdministrador")
    else
        res.render("naoAutenticado")

}

module.exports.cadastraAdministrador = function (application, req, res) {

    let connection = application.config.dbConnection;
    let UsuarioDAO = new application.app.models.UsuarioDAO(connection);

    var dadosForm = req.body

    UsuarioDAO.verificaExistenciaUsuario(dadosForm.usuario, function (callback) {

        req.assert("usuario", "Usuário deve ser informado").notEmpty();

        req.assert("matricula", "Usuário deve ser informado").notEmpty();
        req.assert("funcao", "Função deve ser informado").notEmpty();
        req.assert("nome", "Nome deve ser informado").notEmpty();
        req.assert("senha", "Senha deve ser informado").notEmpty();
        req.assert("confirmaSenha", "Confirmação de Senha deve ser informado").notEmpty();

        var erros = req.validationErrors();

        if (callback) {
            res.status(401).send("jatemusuario")
        } else if (erros) {
            res.status(401).send("invalido")
            return
        } else if (dadosForm.senha != dadosForm.confirmaSenha) {

            res.status(401).send("senhasnaoiguais")
            return

        } else {
            let connection = application.config.dbConnection;
            let UsuarioDAO = new application.app.models.UsuarioDAO(connection);

            //inseriondo mais uma chave no JSON que vem do formulario
            dadosForm.adm = '1';

            UsuarioDAO.insere(dadosForm);


            res.status(200).send("valido")
        }

    });

}

module.exports.cadastraFuncionario = function (application, req, res) {

    let connection = application.config.dbConnection;
    let UsuarioDAO = new application.app.models.UsuarioDAO(connection);

    var dadosForm = req.body

    UsuarioDAO.verificaExistenciaUsuario(dadosForm.usuario, function (callback) {


        req.assert("usuario", "Usuário deve ser informado").notEmpty();

        req.assert("matricula", "Usuário deve ser informado").notEmpty();
        req.assert("funcao", "Função deve ser informado").notEmpty();
        req.assert("nome", "Nome deve ser informado").notEmpty();
        req.assert("senha", "Senha deve ser informado").notEmpty();
        req.assert("confirmaSenha", "Confirmação de Senha deve ser informado").notEmpty();




        var erros = req.validationErrors();

        if (callback) {
            res.status(401).send("jatemusuario")
        }

        else if (erros) {
            res.status(401).send("invalido")
            return
        } else if (dadosForm.senha != dadosForm.confirmaSenha) {

            res.status(401).send("senhasnaoiguais")
            return

        } else {
            let connection = application.config.dbConnection;
            let UsuarioDAO = new application.app.models.UsuarioDAO(connection);

            //inseriondo mais uma chave no JSON que vem do formulario
            dadosForm.adm = '0';

            UsuarioDAO.insere(dadosForm);


            res.status(200).send("valido")
        }

    });







}

module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render("login")
    })
}

module.exports.relatorio = function (application, req, res) {
    res.render("relatorio")
}

module.exports.retornaFuncionarios = function (application, req, res) {

    let connection = application.config.dbConnection

    connection().open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {
            collection.find({ "adm": "0" }).toArray(function (err, resultados) {
                //console.log(resultados)
                mongoclient.close()
                res.send(resultados)
            })
        })
    })
}

module.exports.geraRelatorio = function (application, req, res) {


    var dadosForm = req.body;
    var idUsuario = dadosForm.idUsuario;
    var mes = dadosForm.mes;
    var ano = dadosForm.ano;


    let connection = application.config.dbConnection;

    connection().open(function (err, mongoclient) {
        mongoclient.collection("pontos", function (err, collection) {
            collection.find({ "idUsuario": idUsuario, "dataPonto": { $regex: "/" + mes + "/" + ano } }).toArray(function (err, results) {

                //fazer aqui a lógica para gerar o relatorio do mes
                if (err) {
                    res.status(400).send("nao")
                    console.log("deuRuim")
                    mongoclient.close()
                } else {
                    if (results.length > 0) {
                        console.log(results);


                        // busco dados de usuario em outro documento
                        connection().open(function (err, mongoclient2) {
                            mongoclient2.collection("usuarios", function (err, collection) {
                                collection.find({ "_id": { $eq: ObjectID(idUsuario) } }).toArray(function (err, resultados) {


                                    if (err) {
                                        res.status(400).send("nao")
                                        console.log("deuRUim2")
                                        mongoclient2.close();
                                    } else {
                                        if (resultados.length > 0) {



                                            var dataPonto = []
                                            for (var i in results) {
                                                dataPonto.push("DATA: " + results[i].dataPonto)
                                            }

                                            var ponto = []
                                            for (var i in results) {
                                                ponto.push(results[i].ponto.replace("1000", "INÍCIO DE EXPEDIENTE: "))
                                            }

                                            var pontoRestoDoDia = []
                                            for (var i in results) {

                                                pontoRestoDoDia.push(results[i].pontoRestoDoDia)
                                            }


                                            var arrayFinal = [];
                                            for (var i in results) {
                                                if (pontoRestoDoDia[i] === undefined)
                                                    pontoRestoDoDia[i] = ""

                                                arrayFinal[i] = `${dataPonto[i]} ${ponto[i]} ${pontoRestoDoDia[i]} <br/>`
                                            }
                                            console.log(arrayFinal)
                                            res.send(arrayFinal)


                                            mongoclient2.close();

                                        }
                                    }
                                })
                            })
                        })

                        mongoclient.close()
                    } else {
                        res.send("naoTemRelatorio")
                    }
                }
                mongoclient.close()
            })
        })


    })
}