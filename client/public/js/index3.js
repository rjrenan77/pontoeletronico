

var botaoSair = document.getElementById("btn-sair").addEventListener("click", function (event) {
    event.preventDefault();

    window.location.href = "http://localhost:8080/api/sair";

    location.replace("./login.html");

})

