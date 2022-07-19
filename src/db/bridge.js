const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "web3authsupport",
    database: "TeleDiscordBot",
});

export {connection};

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var sql = 'CREATE TABLE IF NOT EXISTS Bridges (bridgeName varchar (255) unique not null primary key, chatId varchar (255) unique not null, sendUsernames boolean not null, relayCommands boolean not null, relayJoinMessages boolean not null, relayLeaveMessages boolean not null, crossDeleteOnDiscord boolean not null,  channelId varchar (255) not null, threadId varchar (255) unique not null, threadName varchar (255) not null, dcSendUsernames boolean not null, dcRelayJoinMessages boolean not null, dcRelayLeaveMessages boolean not null, crossDeleteOnTelegram boolean not null, direction varchar (255) not null)';
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
});

// var sql2 = "INSERT INTO Bridges (bridgeName, chatId, sendUsernames, relayCommands, relayJoinMessages, relayLeaveMessages, crossDeleteOnDiscord, channelId, threadId, threadName, dcSendUsernames, dcRelayJoinMessages, dcRelayLeaveMessages, crossDeleteOnTelegram, direction) VALUES ('Bridge 1', -566331199, true, true, false, false, true, '993373151717228604', '996030962079109190', 'support testing grp', true, false, false, true, 'both')";
//     connection .query(sql2, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });

var sql2 = "INSERT INTO Bridges (bridgeName, chatId, sendUsernames, relayCommands, relayJoinMessages, relayLeaveMessages, crossDeleteOnDiscord, channelId, threadId, threadName, dcSendUsernames, dcRelayJoinMessages, dcRelayLeaveMessages, crossDeleteOnTelegram, direction) VALUES ?";
var name = 'Bridge 1';
var chatId = -566331199;
var sendUsernames = true;
var relayCommands = true;
var relayJoinMessages = false;
var relayLeaveMessages = false; 
var crossDeleteOnDiscord = false;
var channelId = '993373151717228604';
var threadId = '996030962079109190';
var threadName = 'support testing grp';
var dcSendUsernames = true;
var dcRelayJoinMessages = false;
var dcRelayLeaveMessages = false;
var crossDeleteOnTelegram = true;
var direction = 'both';
var values = [
    [name, chatId, sendUsernames, relayCommands, relayJoinMessages, relayLeaveMessages, crossDeleteOnDiscord, channelId, threadId, threadName, dcSendUsernames, dcRelayJoinMessages, dcRelayLeaveMessages, crossDeleteOnTelegram, direction],
    ];
    connection .query(sql2, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
