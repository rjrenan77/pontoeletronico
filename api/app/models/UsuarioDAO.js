//importando modulo do crypto
var crypto = require("crypto");

function UsuarioDAO(connection) {
    this._connection = connection();
    this._vai;
}

UsuarioDAO.prototype.autenticarPainel = function (usuario, req, res, erros) {

    // if (erros) {
    //     res.status(401).send("invalido");
    //     return
    // }

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {

            var senhaCriptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senhaCriptografada;

            collection.find(usuario).toArray(function (err, results) {
                if (results[0] != undefined) {

                    if (results[0].adm === "1") {
                        req.session.autorizado = true;

                        req.session._id = results[0]._id;
                        req.session.usuario = results[0].usuario;
                        req.session.adm = results[0].adm;
                        res.status(200).send("autorizado")

                    } else {

                        res.status(401).send("naoautorizado")

                    }


                }else {

                    res.status(401).send("naoautorizado")

                }


            })

            mongoclient.close();
        })
    })
}


UsuarioDAO.prototype.autenticar = function (usuario, req, res) {


    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {

            

            var senhaCriptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
             usuario.senha = senhaCriptografada;

            collection.find(usuario).toArray(function (err, results) {
                if (results[0] != undefined) {

                    //variaveis de sessao


                    req.session.autorizado = true;

                    req.session._id = results[0]._id;
                    req.session.usuario = results[0].usuario;
                    req.session.dataHoje = dataHoje();

                }

                if (req.session.autorizado) {
                    res.status(200).send("autorizado")
                }
                else {
                    res.status(401).send("naoautorizado")
                }
            })

            mongoclient.close();
        })
    })
}


UsuarioDAO.prototype.insere = function (novoUsuario) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {

            delete novoUsuario.confirmaSenha;

            var senhaCriptografada = crypto.createHash("md5").update(novoUsuario.senha).digest("hex");
            novoUsuario.senha = senhaCriptografada;
            collection.insert(novoUsuario);

            mongoclient.close();
        })
    })
}


//montando data
function dataHoje() {
    var data = new Date();

    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    dataFormatada = dia + "/" + mes + "/" + ano;
    return dataFormatada
}

module.exports = function () {
    return UsuarioDAO;

}

UsuarioDAO.prototype.verificaExistenciaUsuario = function (usuario, callback) {

    
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (err, collection) {

            console.log(usuario)
            
            collection.find({"usuario": { $eq: usuario }}).toArray(function (err, results) {
                console.log(results)
                if (results.length>0) {
                   
                    callback(true)
                    
                    
                }else{
                    console.log("nao tem usuario")
                    callback(false)
                    
                }


            })

            mongoclient.close();

        })
    })


}