const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coin',
            group: 'coins',
            memberName: 'coin',
            description: 'Crashes the bot.',
            examples: ['repeat']
        });
    }

    run(msg) {
        user = message.member;
        user = user.toString();
        
    }
};
