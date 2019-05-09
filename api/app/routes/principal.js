

module.exports = function(application){
    //objeto de conexao com o mongo db


//rotas
application.post("/api/verificaSeTemPontoRegistrado", (req, res) => {
    
    application.app.controllers.principal.verificaPonto(application,req,res);
    
    
})


application.post("/api/inserePonto", function (req, res) {
    
    application.app.controllers.principal.inserePonto(application,req,res);


})


application.post("/api/autenticar", function(req,res){
    application.app.controllers.principal.autenticar(application,req,res);
})
}