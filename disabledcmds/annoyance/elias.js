import discord from "discord.js-commando";
const { Command } = discord;
export default (class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'elias',
            group: 'annoyance',
            memberName: 'elias',
            description: 'Punish Elias.',
            examples: ['reply'],
            args: [
                {
                    key: 'length',
                    label: 'length',
                    prompt: 'ghjfghg',
                    type: 'integer',
                }
            ]
        });
    }
    run(msg, { length }) {
        var i;
        var id = msg.author.id;
        for (i = 0; i < length; i++) {
            msg.say(`<@!${id.toString()}>`);
            //msg.say("@SilvershotsHQ#9454");
        }
        return msg.say(`<@!${id.toString()}>`);
    }
});
