document.getElementById("botaoGeraRelatorio").addEventListener("click", function (event) {
    event.preventDefault();


    var formData = new FormData();

    let selectFuncionario = document.getElementById("selectFuncionario");

    let opcoes = selectFuncionario.getElementsByTagName("option");

    var idUsuario = selectFuncionario.value;

    var mes = document.getElementById("selectMes").value;
    var ano = document.getElementById("selectAno").value;


    formData.append("idUsuario", idUsuario);
    formData.append("mes", mes);
    formData.append("ano", ano);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var resposta = xhr.responseText;
            //console.log(resposta)

            if (resposta === "naoTemRelatorio") {
                document.getElementById("msgValidacao").innerHTML = "Não há relatórios para esta data."
                return
            }
            else {

                document.getElementById("msgValidacao").innerHTML = ""


                var respostaUnsafe = resposta.replace(/2000/g, "SAÍDA PARA O ALMOÇO: ").replace(/3000/g, "VOLTA DO ALMOÇO: ").replace(/4000/g, "FIM DO EXPEDIENTE: ")
              

                console.log("==>" + respostaUnsafe)

                var dadosDoFuncionario = selectFuncionario.options[selectFuncionario.selectedIndex].text;
                var array = JSON.parse(respostaUnsafe)
                //ver posicionamento dos dados 



                xhr.onload = function () {

                    var win = window.open('', '', 'height=700,width=700');

                    win.document.write('<img height=100 width=200 src="/images/logo.png"> <br/><br/><br/>');
                    win.document.write('<center><h2>Relatório de registro de pontos</h2></center>');
                    win.document.write('<h3>' + dadosDoFuncionario + '</h3><br/>');

                    for (var i = 0; i < array.length; i++)
                        win.document.write(array[i]+ "</br>") ;

                    win.document.close();
                    win.print();
                }


            }
        }
    }

    xhr.open("POST", "http://localhost:8080/painel/geraRelatorio");
    xhr.send(formData);





})