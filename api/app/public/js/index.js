document.getElementById("home").addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("conteudo").innerHTML = '<br><h1><p class="apresentacao"> Painel do sistema de ponto eletrônico</p></h1><img class="print-finger" src="/images/fingerprint.gif" height="200" width="420">';




})

document.getElementById("relatorio").addEventListener("click", function (event) {
    event.preventDefault();

    let conteudo = document.getElementById("conteudo").innerHTML = '<br><br><br><iframe src="/painel/relatorio" height="550" frameBorder=0 width="99.8%" id="iframepesquisar" name="iframepesquisar"/>';




})

document.getElementById("cadastro-funcionario").addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("conteudo").innerHTML = '<br><br><br><iframe src="/painel/cadastrarFuncionario" height="550" frameBorder=0 id="iframecadastrafuncionario" name="iframecadastrafuncionario"/>'


})

document.getElementById("cadastro-administrador").addEventListener("click", function (event) {
    event.preventDefault();


    document.getElementById("conteudo").innerHTML = '<br><br><br><iframe src="/painel/cadastrarAdministrador" height="550" frameBorder=0 id="iframecadastraadministrador" name="iframecadastraadministrador"/>'



})

document.getElementById("sair").addEventListener("click", function (event) {
    event.preventDefault();

    window.location.href = "/painel/sair"
})