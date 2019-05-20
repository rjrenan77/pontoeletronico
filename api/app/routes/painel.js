
module.exports = function(application){

    
    application.get("/painel/index", function(req,res){
        application.app.controllers.painel.index(application,req,res);
       
    })

    application.get("/painel/cadastrarAdministrador", function(req, res){
        application.app.controllers.painel.cadastrarAdministrador(application, req,res);
    })

    application.post("/painel/cadastraAdministrador", function(req, res){
        application.app.controllers.painel.cadastraAdministrador(application, req,res);
    })



}