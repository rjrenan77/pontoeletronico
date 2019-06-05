

var botaoSair = document.getElementById("btn-sair").addEventListener("click", function (event) {
    event.preventDefault();

    window.location.href = "/api/sair";

    location.replace("./login.html");

})

