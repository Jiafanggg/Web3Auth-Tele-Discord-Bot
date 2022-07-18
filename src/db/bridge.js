const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "TeleDiscordBot",
  });
  
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

connection.query("CREATE DATABASE bridges", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

var sql = `CREATE TABLE bridgeName VARCHAR(255), 
            chatId VARCHAR(255), sendUsernames BOOLEAN, 
            relayCommands BOOLEAN, relayJoinMessages BOOLEAN,  
            relayLeaveMessages BOOLEAN, crossDeleteOnDiscord BOOLEAN,  
            channelId VARCHAR(255), threadId VARCHAR(255), 
            threadName VARCHAR(255), dcSendUsernames BOOLEAN, 
            dcRelayJoinMessages BOOLEAN, dcRelayLeaveMessages BOOLEAN,
            crossDeleteOnTelegram BOOLEAN, direction VARCHAR(255)`;

connection.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Table created");
    });
});
