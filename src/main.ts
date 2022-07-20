// General stuff
import semver from "semver";
import yargs from "yargs";
import path from "path";
import { Logger } from "./Logger";
import { MessageMap } from "./MessageMap";
import { Bridge, BridgeProperties } from "./bridgestuff/Bridge";
import { BridgeMap } from "./bridgestuff/BridgeMap";
import { Settings } from "./settings/Settings";
import jsYaml from "js-yaml";
import fs from "fs";
import R from "ramda";
import os from "os";

// Telegram stuff
import { Telegraf } from "telegraf";
import { setup as telegramSetup, TediTelegraf } from "./telegram2discord/setup";

// Discord stuff
import { Client as DiscordClient, Intents } from "discord.js";
import { setup as discordSetup } from "./discord2telegram/setup";

if (!semver.gte(process.version, "16.0.0")) {
	console.log(`TediCross requires at least nodejs 16.0. Your version is ${process.version}`);
	process.exit();
}

/*************
 * TediCross *
 *************/

// Get command line arguments if any
const args = yargs
	.alias("v", "version")
	.alias("h", "help")
	.option("config", {
		alias: "c",
		default: path.join(__dirname, "..", "settings.yaml"),
		describe: "Specify path to settings file",
		type: "string"
	})
	.option("data-dir", {
		alias: "d",
		default: path.join(__dirname, "..", "data"),
		describe: "Specify the path to the directory to store data in",
		type: "string"
	}).argv as { config: string, dataDir: string };


// Get the settings
const settingsPath = args.config;
const rawSettingsObj = jsYaml.load(fs.readFileSync(settingsPath, "utf-8"));
const settings = Settings.fromObj(rawSettingsObj);


// Initialize logger
const logger = new Logger(settings.debug);

// Write the settings back to the settings file if they have been modified
const newRawSettingsObj = settings.toObj();
if (R.not(R.equals(rawSettingsObj, newRawSettingsObj))) {
	// Turn it into notepad friendly YAML
	//TODO: Replaced safeDump with dump. It needs to be verified
	const yaml = jsYaml.dump(newRawSettingsObj).replace(/\n/g, "\r\n");

	try {
		fs.writeFileSync(settingsPath, yaml);
	} catch (err: any) {
		if (err.code === "EACCES") {
			// The settings file is not writable. Give a warning
			logger.warn(
				"Changes to TediCross' settings have been introduced. Your settings file it not writable, so it could not be automatically updated. TediCross will still work, with the modified settings, but you will see this warning until you update your settings file"
			);

			// Write the settings to temp instead
			const tmpPath = path.join(os.tmpdir(), "tedicross-settings.yaml");
			try {
				fs.writeFileSync(tmpPath, yaml);
				logger.info(
					`The new settings file has instead been written to '${tmpPath}'. Copy it to its proper location to get rid of the warning`
				);
			} catch (err) {
				logger.warn(
					`An attempt was made to put the modified settings file at '${tmpPath}', but it could not be done. See the following error message`
				);
				logger.warn(err);
			}
		}
	}
}

// Create a Telegram bot
const tgBot = new Telegraf(settings.telegram.token);

// Create a Discord bot
const dcBot = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Create a message ID map
const messageMap = new MessageMap();


// Create the bridge map

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "web3authsupport",
    database: "TeleDiscordBot",
});

connection.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected!");
});

var sql = 'CREATE TABLE IF NOT EXISTS Bridges (bridgeName varchar (255) unique not null primary key, chatId varchar (255) unique not null, sendUsernames boolean not null, relayCommands boolean not null, relayJoinMessages boolean not null, relayLeaveMessages boolean not null, crossDeleteOnDiscord boolean not null,  channelId varchar (255) not null, threadId varchar (255) unique not null, threadName varchar (255) not null, dcSendUsernames boolean not null, dcRelayJoinMessages boolean not null, dcRelayLeaveMessages boolean not null, crossDeleteOnTelegram boolean not null, direction varchar (255) not null)';
        connection.query(sql, function (err: any, result: any) {
            if (err) throw err;
            console.log("Table created");
});

// connection.connect(function(err: any) {
//     if (err) throw err;
//     connection.query("SELECT * FROM bridges", function (err: any, result: String | any, fields: any) {
//         if (err) throw err;
// 		const bridgeMap = new BridgeMap(result);
// 		console.log(bridgeMap);
//     });
// });

// connection.connect(function(err: any) {
//     if (err) throw err;
//     connection.query("SELECT * FROM bridges", function (err: any, result: string | any[], fields: any) {
//         if (err) throw err;
//           for (let set = 0; set < result.length; set++) {
//             let data = result[set]
// 			// const bridgeMap = new BridgeMap(result.map((bridgeSettings: BridgeProperties) => new Bridge(bridgeSettings)));
//             for(const key in data) {
//                 console.log(key);
//                 if(data.hasOwnProperty(key)) {
//                     var value = data[key];
//                     console.log(value)
//                 }
//             }
//     }});
// });

const bridgeMap = new BridgeMap(settings.bridges.map((bridgeSettings: BridgeProperties) => new Bridge(bridgeSettings)));

/*********************
 * Set up the bridge *
 *********************/

discordSetup(logger, dcBot, tgBot, messageMap, bridgeMap, settings, args.dataDir);
telegramSetup(logger, tgBot as TediTelegraf, dcBot, messageMap, bridgeMap, settings);
