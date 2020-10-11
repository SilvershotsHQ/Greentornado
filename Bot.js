import commando from "discord.js-commando";
import path from "path";
import commonTags from "common-tags";
import sqlite from "better-sqlite3";
import winston from "winston";
import * as welcomer from "./actions/welcomeUser";
import * as statusRotator from "./rotators/status";
import express from "express";
import rest from "./rest";
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
const oneLine = commonTags.oneLine;
let client;
if (process.env.BOT_ENV === "prod") {
    client = new commando.Client({
        owner: ['421883193969344524', '373833473091436546'],
        commandPrefix: 'g!'
    });
}
else {
    client = new commando.Client({
        owner: ['421883193969344524', '373833473091436546'],
        commandPrefix: 'dg!'
    });
}
client.logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.printf(log => `[NODE ${log.level.toUpperCase()}] - ${log.message}`),
});
client
    .on('debug', m => client.logger.log('debug', m))
    .on('warn', m => client.logger.log('warn', m))
    .on('error', m => client.logger.log('error', m))
    .on('ready', () => {
    client.logger.log('info', `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    statusRotator.startRotation(client);
    // start the REST api
    const app = express();
    rest(app, client);
    app.get('/', function (req, res) {
        res.send('GreenTornado REST API v1');
    });
    app.listen(process.env.BOT_ENV === "prod" ? 80 : 8080, function () {
        client.logger.log('info', 'App listening on port 80');
    });
})
    .on('disconnect', () => { console.warn('Disconnected!'); })
    .on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError)
        return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
})
    .on('commandBlocked', (msg, reason) => {
    client.logger.log('info', oneLine `
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
})
    .on('commandPrefixChange', (guild, prefix) => {
    client.logger.log('info', oneLine `
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
})
    .on('commandStatusChange', (guild, command, enabled) => {
    client.logger.log('info', oneLine `
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
})
    .on('groupStatusChange', (guild, group, enabled) => {
    client.logger.log('info', oneLine `
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
})
    .on('guildMemberAdd', member => {
    welcomer.welcomeAUser(member);
})
    .on('message', message => {
    if (message.content === 'debug!join') {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("You need to be an admin to use this command.");
        client.emit('guildMemberAdd', message.member);
    }
});
client.setProvider(new commando.SyncSQLiteProvider(new sqlite(path.join(__dirname, 'database.sqlite3')))).catch(console.error);
client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroups([
    ['administration', 'Administration'],
    ['math', 'Math'],
    ['test', 'Test'],
    ['coins', 'Coins'],
    ['annoyance', 'Annoyance'],
    ['how_to_win_an_arguement', 'how to win an argument'],
    ['github', 'GitHub'],
    ['osu', 'osu!'],
    ['music', 'Music'],
    ['settings', 'Settings']
])
    .registerTypesIn(path.join(__dirname, 'types'))
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.login(process.env.TOKEN);
