function UsuarioDAO(connection){
    this._connection = connection();
}


UsuarioDAO.prototype.autenticar = function(usuario, req,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err,results){
                if(results[0] != undefined){
                    //variaveis de sessao
                    req.session.autorizado = true;

                    req.session.usuario = results[0].usuario;
                    req.session._id = results[0]._id;

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

module.exports = function(){
    return UsuarioDAO;

}