DROP DATABASE IF EXISTS TeleDiscordBot;

CREATE DATABASE TeleDiscordBot;

use TeleDiscordBot;

CREATE TABLE Bridges (
	bridgeName varchar (255) unique not null,
    chatId varchar (255) unique not null, 
    sendUsernames boolean not null, 
    relayCommands boolean not null, 
    relayJoinMessages boolean not null,  
    relayLeaveMessages boolean not null, 
    crossDeleteOnDiscord boolean not null,  
    channelId varchar (255) not null, 
    threadId varchar (255) unique not null, 
    threadName varchar (255) not null, 
    dcSendUsernames boolean not null, 
    dcRelayJoinMessages boolean not null, 
    dcRelayLeaveMessages boolean not null,
    crossDeleteOnTelegram boolean not null, 
    direction varchar (255) not null
    primary key (bridgeName)
);

