const request = require('request')
const embed = require('../view/embedFactory')

class Moeda {
    constructor(moeda){
        this.moeda = moeda
        this.url = `https://economia.awesomeapi.com.br/json/all/${this.moeda}`
    }
    async sendEmbed(sender, channel){
        request(this.url, async (error, response, body) => {
            const json = JSON.parse(body)
            const moedaName =  `${this.moeda}`.split('-')[0];
            channel.send({embed: embed.embedFactory(
                undefined,
                0x008000,
                'https://kooper.dev/bots/consumista',
                `1 ${moedaName} = ${Number.parseFloat(json[moedaName]['ask']).toFixed(2)} BRL`,
                `https://image.flaticon.com/icons/png/512/275/275806.png`,
                undefined,
                undefined

            )})
        })
    }
}

module.exports = Moeda