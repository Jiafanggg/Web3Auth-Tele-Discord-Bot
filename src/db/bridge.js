var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "root"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE TeleDiscordBot", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    var sql = `CREATE TABLE bridges name VARCHAR(255), 
            chatId VARCHAR(255), sendUsernames BOOLEAN, 
            relayCommands BOOLEAN, relayJoinMessages BOOLEAN,  
            relayLeaveMessages BOOLEAN, crossDeleteOnDiscord BOOLEAN,  
            channelId VARCHAR(255), threadId VARCHAR(255), 
            threadName VARCHAR(255), dcSendUsernames BOOLEAN, 
            dcRelayJoinMessages BOOLEAN, dcRelayLeaveMessages BOOLEAN,
            crossDeleteOnTelegram BOOLEAN, direction VARCHAR(255)`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
