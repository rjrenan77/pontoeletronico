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