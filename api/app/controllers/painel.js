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
    var dadosForm = req.body

    req.assert("usuario", "Usuário deve ser informado").notEmpty();

    req.assert("matricula", "Usuário deve ser informado").notEmpty();
    req.assert("funcao", "Função deve ser informado").notEmpty();
    req.assert("nome", "Nome deve ser informado").notEmpty();
    req.assert("senha", "Senha deve ser informado").notEmpty();
    req.assert("confirmaSenha", "Confirmação de Senha deve ser informado").notEmpty();

    var erros = req.validationErrors();

    if (erros) {
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


}

module.exports.cadastraFuncionario = function (application, req, res) {
    var dadosForm = req.body

    req.assert("usuario", "Usuário deve ser informado").notEmpty();

    req.assert("matricula", "Usuário deve ser informado").notEmpty();
    req.assert("funcao", "Função deve ser informado").notEmpty();
    req.assert("nome", "Nome deve ser informado").notEmpty();
    req.assert("senha", "Senha deve ser informado").notEmpty();
    req.assert("confirmaSenha", "Confirmação de Senha deve ser informado").notEmpty();

    var erros = req.validationErrors();

    if (erros) {
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
                console.log(resultados)
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
            collection.find({ "idUsuario": idUsuario, "dataPonto": { $regex: "/"+mes+"/"+ano } }).toArray(function (err, results) {

                //fazer aqui a lógica para gerar o relatorio do mes
                if(results.length > 0){
                    console.log(results[0])
                }
                // if (err) {
                //     res.status(400).send("nao")
                //     console.log("deuRuim")
                //     mongoclient.close()
                // } else {
                //     if (results.length > 0) {
                //         //console.log(results[0].pontoRestoDoDia[0]);

                //         var idaAlmoço = "SAÍDA PARA O ALMOÇO: AINDA NÃO REGISTRADO"
                //         var voltaAlmoço = "VOLTA DO ALMOÇO: AINDA NÃO REGISTRADO"
                //         var saida = "FIM DO EXPEDIENTE: AINDA NÃO REGISTRADO"


                //         // verifico a existencia de pontos do resto do dia
                //         if (results[0].pontoRestoDoDia != undefined) {
                //             if (results[0].pontoRestoDoDia[0] != undefined) {
                //                 idaAlmoço = results[0].pontoRestoDoDia[0].replace("2000", "SAÍDA PARA O ALMOÇO: ")
                //             } if (results[0].pontoRestoDoDia[1] != undefined) {
                //                 voltaAlmoço = results[0].pontoRestoDoDia[1].replace("3000", "VOLTA DO ALMOÇO: " )
                //             } if (results[0].pontoRestoDoDia[2] != undefined) {
                //                 saida = results[0].pontoRestoDoDia[2].replace("4000", "FIM DO EXPEDIENTE: ")
                //             }
                //         }

                //         //busco dados de usuario em outro documento
                //         connection().open(function (err, mongoclient2) {
                //             mongoclient2.collection("usuarios", function (err, collection) {
                //                 collection.find({ "_id": { $eq: ObjectID(req.session._id) } }).toArray(function (err, resultados) {


                //                     if (err) {
                //                         res.status(400).send("nao")
                //                         console.log("deuRUim2")
                //                         mongoclient2.close();
                //                     } else {
                //                         if (resultados.length > 0) {
                //                             let nome  = resultados[0].nome;
                //                             let doc = new PDFDocument();
                //                             doc.y = 3200
                //                             doc.fillColor('black')


                                           
                //                             doc
                //                             .font("Times-Bold")
                //                             .text("CONSELHO REGIONAL DE ODONTOLOGIA DO RIO DE JANEIRO ", 100,100, {

                //                                 indent: 20,
                //                                 align: 'justify',
                                                
                                              
                //                             });

                //                             doc.moveDown();

                //                             doc
                //                             .font("Times-Roman")
                //                             .text("NOME: " + nome, {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveDown(0.3);

                //                             doc.text("DATA: " + results[0].dataPonto, {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveDown(0.3);

                //                             doc.text( results[0].ponto.replace("1000", "INÍCIO DE EXPEDIENTE: "), {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveDown(0.3);

                //                             doc.text(idaAlmoço, {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveDown(0.3);

                //                             doc.text(voltaAlmoço , {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveDown(0.3);

                //                             doc.text(saida, {

                //                                 indent: 20,
                //                                 align: 'justify',
                                              
                //                             });

                //                             doc.moveUp(0.3);



                //                             doc.rect(doc.x, 50 , 410, doc.y).stroke();

                //                             doc.end();
                //                             doc.pipe(res);
                //                             mongoclient2.close();

                //                         }
                //                     }
                //                 })
                //             })
                //         })

                //         mongoclient.close()
                //     } else {
                //         console.log("nao tem comprovante de hj ainda")
                //     }
                // }
                mongoclient.close()
            })
        })


    })
}