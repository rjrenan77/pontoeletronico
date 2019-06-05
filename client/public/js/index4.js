

    //ao inves de enviar o usuario, pega ele já no back end atraves da variavel de sessao e verifica o ponto, verificar o obejctId

    function verificaPonto(idUsuario1, dataHoje1 = data().replace("Data: ", "")) {

        //se usuario já tem tipo de  ponto naquela data, desativa botao respectivo
        var formData1 = new FormData();

        formData1.append("idUsuario1", idUsuario1);
        formData1.append("dataHoje1", dataHoje1);

        var xhr1 = new XMLHttpRequest();

        xhr1.onreadystatechange = function () {

            if (xhr1.readyState == 4) {
                var resposta1 = xhr1.responseText;
                //console.log(resposta1)


                xhr1.onload = function () {

                    if (resposta1 === "0") {
                        let botaoComprovante = document.getElementById("btn-comprovante");
                        botaoComprovante.disabled = true;
                        botaoComprovante.innerHTML = "Sem registros de pontos hoje";
                    }

                    if (resposta1 === "1000") {
                        let selectPonto = document.getElementById("selectPonto");

                        let opcoes = selectPonto.getElementsByTagName("option");
                        opcoes[0].setAttribute("disabled", true);
                        opcoes[1].setAttribute("selected", true);


                    }
                    if (resposta1 === "10002000") {
                        let selectPonto = document.getElementById("selectPonto");

                        let opcoes = selectPonto.getElementsByTagName("option");
                        opcoes[0].setAttribute("disabled", true);
                        opcoes[1].setAttribute("disabled", true);
                        opcoes[2].setAttribute("selected", true);



                    }

                    if (resposta1 === "100020003000") {
                        let selectPonto = document.getElementById("selectPonto");

                        let opcoes = selectPonto.getElementsByTagName("option");
                        opcoes[0].setAttribute("disabled", true);
                        opcoes[1].setAttribute("disabled", true);
                        opcoes[2].setAttribute("disabled", true);
                        opcoes[3].setAttribute("selected", true);



                    }

                    if (resposta1 === "1000200030004000") {
                        let selectPonto = document.getElementById("selectPonto");

                        let opcoes = selectPonto.getElementsByTagName("option");
                        opcoes[0].setAttribute("disabled", true);
                        opcoes[1].setAttribute("disabled", true);
                        opcoes[2].setAttribute("disabled", true);
                        opcoes[3].setAttribute("disabled", true);


                        let botao = document.getElementById("btn-ponto");
                        botao.disabled = true;
                        botao.innerHTML = "já bateu todos os pontos";

                    }
                }


                //document.write(Date());


            }
        }



        xhr1.open("POST", "http://localhost:8080/api/verificaSeTemPontoRegistrado")
        xhr1.send(formData1);

    }

