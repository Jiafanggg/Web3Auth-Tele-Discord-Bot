const mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "web3authsupport",
    database: "TeleDiscordBot",
});

module.exports = {connection: connection} ;

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     var sql = "DROP TABLE Bridges";
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table deleted");
//     });
//   });

// var sql = 'CREATE TABLE IF NOT EXISTS Bridges (bridgeName varchar (255) unique not null primary key, chatId varchar (255) unique not null, sendUsernames boolean not null, relayCommands boolean not null, relayJoinMessages boolean not null, relayLeaveMessages boolean not null, crossDeleteOnDiscord boolean not null,  channelId varchar (255) not null, threadId varchar (255) unique not null, threadName varchar (255) not null, dcSendUsernames boolean not null, dcRelayJoinMessages boolean not null, dcRelayLeaveMessages boolean not null, crossDeleteOnTelegram boolean not null, direction varchar (255) not null)';
// connection.query(sql, function (err, result) {
//     if (err) throw err;
// });

// connection.query("SELECT * FROM Bridges", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

// var sql2 = 'CREATE TABLE Messages (messageId varchar (255) unique not null primary key, bridgeName varchar (255) unique not null, attachment varchar (255) not null, attachmentName varchar (255) not null, FOREIGN KEY (bridgeName) REFERENCES Bridges(bridgeName))';
// connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
// });
        
// connection.query("SELECT * FROM Messages", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

// connection.query("SELECT * FROM Bridges where bridgeName", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });


// connection.connect(function(err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM bridges", function (err, result, fields) {
//         if (err) throw err;
//           for (let set = 0; set < result.length; set++) {
//             let data = result[set]
//             for(key in data) {
//                 console.log(key);
//                 if(data.hasOwnProperty(key)) {
//                     var value = data[key];
//                     console.log(value)
//                 }
//             }
//     }});
// });
