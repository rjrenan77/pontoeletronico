
module.exports = function(application){

    
    application.get("/painel/index", function(req,res){
        application.app.controllers.painel.index(application,req,res);
       
    })


}