const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, prefix, canal } = require('../config.json')
const Rastreio = require('./Controller/rastreio')

bot.on('ready', () => {
    console.log("Bot Inicializado")
    console.log("vamos comprar tudo que não precisamos")
})
bot.on('message', async (e) => {
    const channel = e.channel
    const message = e.content
    const sender = e.author
    if (message.startsWith(`${prefix}`)) {
        const args = message.split(" ");
        if (args[0] === "c.rast" || args[0] == "c.rastrear") {
            if (args.length > 0) {
                const codigo = args[1]
                const rastreio = new Rastreio(codigo);
                rastreio.sendEmbed(sender, channel)
            }
        }
    }
})
bot.login(token)