const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, prefix, canal } = require('../config.json')
const Rastreio = require('./Controller/rastreio')
const Moeda = require('./Controller/cambio')
const Cep = require('./Controller/cep')

bot.on('ready', () => {
    console.log("Dependência carregadas")
    console.log("Consumista Bot está online")
    console.log(`Atualmente ${bot.guilds.cache.size} servidores usam o Consumista.`)
})
bot.on('message', async (e) => {
    const channel = e.channel
    const message = e.content
    const sender = e.author
    if (message.startsWith(`${prefix}`)) {
        const tag = e.guild.roles.cache.find(f => f.name === "CONSUMIDOR");
        if(!tag){
            channel.send('O servidor precisa de uma TAG com nome **CONSUMIDOR** para que se possa usar os comandos.')
            return
        }
        const memberRole = tag.members.find(f => f.displayName === sender.username)
        if(!memberRole){
            channel.send('Você precisa ter a tag **CONSUMIDOR** para usar esse comando.')
            return
        }
        const args = message.split(" ");
        switch (args[0]) {
            case "c.rast":
                if (args.length > 1) {
                    const codigoRast = args[1]
                    const rastreio = new Rastreio(codigoRast);
                    rastreio.sendEmbed(sender, channel)
                }
                break;
            case "c.dolar":
                const dollar = new Moeda('USD-BRL');
                dollar.sendEmbed(sender, channel)
                break;
            case "c.euro":
                const euro = new Moeda('EUR-BRL');
                euro.sendEmbed(sender, channel)
                break;
            case "c.cep":
                if (args.length > 1) {
                    const codigoCep = `${args[1]}`.replace('-', '')
                    const cep = new Cep(codigoCep)
                    cep.sendEmbed(sender, channel)
                }
                break;
            case "c.cup":
                channel.send('Em desenvolvimento..')
                break;
            case "c.games":
                channel.send('Em desenvolvimento..')
                break;
            case "c.market":
                channel.send('Em desenvolvimento..')
                break;
            default:
                break;
        }
    }
})
bot.login(token)