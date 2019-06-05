function retornaFuncionarios() {

    var xhr1 = new XMLHttpRequest();

    xhr1.onreadystatechange = function () {

        if (xhr1.readyState == 4) {
            var resposta1 = xhr1.responseText;

            var json = JSON.parse(resposta1)
            //console.log(json)


            let selectFuncionario = document.getElementById("selectFuncionario");
            for (var i in json) {
                var option = document.createElement("option");

                option.value = json[i]._id;
                option.text = "Matricula: " + json[i].matricula + " | Nome: " + json[i].nome + " | Função: " + json[i].funcao;
                selectFuncionario.add(option)
            }

        }
    }



    xhr1.open("GET", "http://localhost:8080/painel/retornaFuncionarios")
    xhr1.send();

}