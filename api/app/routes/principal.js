

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

application.get("/api/sair", function(req,res){
    application.app.controllers.principal.sair(application,req,res);
})


application.get("/api/imprimeComprovante", function(req,res){
    application.app.controllers.principal.imprimeComprovante(application,req,res);
})


}