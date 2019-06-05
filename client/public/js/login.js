document.getElementById("botaoLogin").addEventListener("click", function (event) {
    event.preventDefault();

    var formData = new FormData();

    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;



    formData.append("usuario", usuario);
    formData.append("senha", senha);


    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var resposta = xhr.responseText;
            console.log(resposta)

            //talvez sirva para recarregar a pagina
            xhr.onload = function () {
                if (resposta === "401") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Usuário ou Senha Inválidos!"


                }

                if (resposta === "autorizado") {
                    console.log("entraaaaa")
                    location.replace("./index.html");
                    // window.open("index.html","_blank");

                }

                if (resposta === "naoautorizado") {
                    var msgValidacao = document.getElementById("msgValidacao");
                    msgValidacao.innerHTML = "ATENÇÃO: Usuário ou Senha não autorizados. Procure o administrador do sistema."


                }
            }


            //  document.write(Date());



        }
    }

    xhr.open("POST", "http://localhost:8080/api/autenticar");
    xhr.send(formData);

    // location.reload()


});
