const Command = require('./commande')

module.exports = class Ping extends Command {
    static match (message) {
        return message.content.startsWith('!ping')
    }

    static action(message) {
        message.reply('pong')
    }
}
