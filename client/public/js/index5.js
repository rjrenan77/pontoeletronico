

    //montando data
    function data() {
        var data = new Date();

        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        dataFormatada = "Data: "+dia + "/" + mes + "/" + ano;

        document.getElementById("dataPonto").innerHTML = dataFormatada;

        return dataFormatada;
    }

    // montando hora
    function hora() {
        var hora = new Date();
        var h = hora.getHours();
        var m = hora.getMinutes();
        var s = hora.getSeconds();

        h = acrescentaZero(h);
        m = acrescentaZero(m);
        s = acrescentaZero(s);

        var hora = "Hora: " + h + ":" + m + ":" + s;

        document.getElementById("horaPonto").innerHTML = hora;

        setTimeout("hora()", 500);

        return hora;
    }

    function acrescentaZero(i) {

        if (i < 10) {
            i = "0" + i;
        }

        return i;
    }

