const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "menu"
});

connection.connect((error)  => {
    if(error){
        return console.error(error)
    }else{
        console.log("Estamos conectados a la DB de Menu");
    }
});

module.exports = connection;