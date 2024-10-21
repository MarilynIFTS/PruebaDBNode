const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pizzeria"
});

connection.connect((error)  => {
    if(error){
        return console.error(error)
    }else{
        console.log("Estamos conectados a la DB de Pizzeria");
    }
});

module.exports = connection;