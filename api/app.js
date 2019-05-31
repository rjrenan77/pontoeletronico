var app = require("./config/server")

var porta = process.env.PORT || 8080;

app.listen(porta, function(){
    console.log(__dirname)
    console.log("servidor online")
})