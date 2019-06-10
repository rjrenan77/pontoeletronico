document.getElementById("botaoEntrar").addEventListener("click", function (event) {
    event.preventDefault();

    var formData = new FormData();

    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    formData.append("usuario", usuario);
    formData.append("senha", senha);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        var resposta = xhr.responseText;
        console.log(resposta);

        xhr.onload = function () {
            if (resposta === "invalido") {
                document.getElementById("msgValidacao").innerHTML = "ATENÇÃO: CAMPOS USUÁRIO OU SENHA NÃO PODEM SER VAZIOS!";
            }
            if (resposta === "autorizado") {
                window.location = "index"
            }
            if (resposta === "naoautorizado") {
                document.getElementById("msgValidacao").innerHTML = "ATENÇÃO: USUÁRIO NÃO IDENTIFICADO!";
            }
        }

    }

    // em producao , soemte aqui,deve se usar o POST com o dns configurado pra que ele carregue a sessao direitinho
    //xhr.open("POST", "http://site.org.br/painel/logon")

    xhr.open("POST", "http://localhost:8080/painel/logon")
    xhr.send(formData);


})