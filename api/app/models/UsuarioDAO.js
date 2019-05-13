function UsuarioDAO(connection){
    this._connection = connection();
}


UsuarioDAO.prototype.autenticar = function(usuario, req,res){

    
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err,results){
                if(results[0] != undefined){


                    

                    //variaveis de sessao
                    var dados = req.body;
                    
                    req.session.autorizado = true;

                    req.session._id = results[0]._id;
                    req.session.usuario = results[0].usuario;
                    req.session.dataHoje = dataHoje();

                }

                if(req.session.autorizado){
                    res.status(200).send("autorizado")
                }
                else{
                    res.status(401).send("naoautorizado")
                }
            })

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

module.exports = function(){
    return UsuarioDAO;

}