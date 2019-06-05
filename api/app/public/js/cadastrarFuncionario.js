document.getElementById("botaoCadastro").addEventListener("click", function (event) {
    event.preventDefault();

    var formData = new FormData();

    var nome = document.getElementById("nome").value;
    var matricula = document.getElementById("matricula").value;
    var funcao = document.getElementById("funcao").value;
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    var confirmaSenha = document.getElementById("confirmaSenha").value;


    formData.append("nome", nome);
    formData.append("matricula", matricula);
    formData.append("funcao", funcao);
    formData.append("usuario", usuario);

    formData.append("senha", senha);
    formData.append("confirmaSenha", confirmaSenha);


    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var resposta = xhr.responseText;
            console.log(resposta)

            //talvez sirva para recarregar a pagina
            xhr.onload = function () {
                if (resposta === "invalido") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Há campos vazios ou inválidos!"


                }

                if (resposta === "senhasnaoiguais") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Campos senha e confirmação devem ser iguais!"


                }

                if (resposta === "jatemusuario") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Usuário já existente no sistema!"


                }


                if (resposta === "valido") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Novo funcionário para registro de ponto cadastrado com sucesso!"

                    document.getElementById("nome").value = "";
                    document.getElementById("matricula").value = "";
                    document.getElementById("funcao").value = "";
                    document.getElementById("usuario").value = ""
                    document.getElementById("senha").value = "";
                    document.getElementById("confirmaSenha").value = "";


                }
            }


            //  document.write(Date());



        }
    }

    xhr.open("POST", "http://localhost:8080/painel/cadastraFuncionario");
    xhr.send(formData);

    // location.reload()


});