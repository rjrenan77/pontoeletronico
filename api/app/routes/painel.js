
module.exports = function(application){

    
    application.get("/painel/index", function(req,res){
        application.app.controllers.painel.index(application,req,res);
       
    })

    application.get("/painel/cadastrarAdministrador", function(req, res){
        application.app.controllers.painel.cadastrarAdministrador(application, req,res);
    })

    application.get("/painel/cadastrarFuncionario", function(req,res){
        application.app.controllers.painel.cadastrarFuncionario(application, req, res);
    })

    application.get("/painel/login", function(req,res){
        application.app.controllers.painel.login(application,req,res);
    })

    application.get("/painel/sair", function(req, res){
        application.app.controllers.painel.sair(application,req,res);  
    })


    application.post("/painel/cadastraAdministrador", function(req, res){
        application.app.controllers.painel.cadastraAdministrador(application, req,res);
    })

    application.post("/painel/cadastraFuncionario", function(req,res){
        application.app.controllers.painel.cadastraFuncionario(application,req,res);
    })

    application.post("/painel/logon", function(req,res){
        application.app.controllers.painel.logon(application,req,res);
    })



}