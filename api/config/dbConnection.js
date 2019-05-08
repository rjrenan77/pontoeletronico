const mongodb = require("mongodb");

var connMongoDB = function(){
    const db = new mongodb.Db(
        "crorjponto",
        new mongodb.Server('localhost', 27017, {}),
        {}
    
    )
    
    return db;

}

module.exports = function(){
    return connMongoDB;
}