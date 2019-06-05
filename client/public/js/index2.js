
    document.getElementById("btn-ponto").addEventListener("click", function (event) {
        event.preventDefault();

        var formData = new FormData();

        var idUsuario = "";
        var tipoPonto = document.getElementById("selectPonto").value;
        var dataPonto = data().replace("Data: ", "");
        var horaPonto = hora().replace("Hora: ", "");;

        var ponto = tipoPonto + " " + horaPonto;


        //var arrayPontosDoDia = JSON.parse("["+pontoFormatado+"]").split();



        formData.append("idUsuario", idUsuario);
        formData.append("dataPonto", dataPonto);
        formData.append("ponto", ponto);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                var resposta = xhr.responseText;
                // console.log(resposta)

                //talvez sirva para recarregar a pagina
                xhr.onload = function () {
                    if (resposta === "adicionado") {
                        location.href = "sucesso.html"
                    }
                    if (resposta === "atualizado") {
                        location.href = "sucesso.html"
                    }
                }


                //  document.write(Date());



            }
        }

        xhr.open("POST", "http://localhost:8080/api/inserePonto");
        xhr.send(formData);

        //  location.reload()


    });


