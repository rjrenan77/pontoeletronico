document.getElementById("btn-comprovante").addEventListener("click", function (event) {
    event.preventDefault();


    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var resposta = xhr.responseText;
            // console.log(resposta)

            //talvez sirva para recarregar a pagina
            xhr.onload = function () {
                if (resposta === "naotemComprovanteHoje") {
                    console.log("nãotemmmmm")
                }

            }


            //  document.write(Date());



        }
    }
    window.location.href = "http://localhost:8080/api/imprimeComprovante";

})

