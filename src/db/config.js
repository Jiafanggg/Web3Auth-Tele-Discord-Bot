const mysql = require("mysql2");

exports.connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "web3authsupport",
    database: "TeleDiscordBot",
});
