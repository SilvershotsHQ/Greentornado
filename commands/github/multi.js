const { Command } = require('discord.js-commando');
const Embed = require("./../../utils/embed");
const embed1 = 
      {
        "title": "Woah",
        "description": "You can also have multiple embeds!"
      }
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'multi',
            group: 'github',
            memberName: 'multi',
            description: 'Admin-only test command.',
            examples: ['g!multi'],
            userPermissions: ['ADMINISTRATOR']
        });
    }
    async run(msg, { user }){
        if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("You need to be an admin to use this command.");
        Embed.sendhook(msg, [embed1]);

    }
};