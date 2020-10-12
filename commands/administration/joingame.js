const { Command } = require('discord.js-commando');
const runner = require('../../among-us-js/session-runner')
let session;
let started = false;
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'joingame',
            group: 'administration',
            memberName: 'joingame',
            description: 'Bridge the 2 among us channels.',
            examples: ['g!joingame'],
            userPermissions: ['ADMINISTRATOR'],
            args: [
                // {
                //     key: 'region',
                //     label: 'region',
                //     prompt: 'ghjfghg',
                //     type: 'string',
                //     default: ''
                // },
                {
                    key: 'id',
                    label: 'id',
                    prompt: 'ghjfghg',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }
    async run(msg, { id }) {
        if (!started) {
            started = true
            session = await runner(this.client, {lobbyCode: id, region: 'North America'}, msg)
        } else {
            await session.leaveLobby()
            session = null
            started = false
        }
    }
};
