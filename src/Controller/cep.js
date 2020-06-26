const request = require('request')
const embed = require('../view/embedFactory')

class Cep {
    constructor(cep){
        this.cep = cep
        this.url = `https://cep.awesomeapi.com.br/json/${this.cep}`
    }
    async sendEmbed(sender, channel){
        request(this.url, async (error, response, body) => {
            const json = JSON.parse(body)
            if(json['status']){
                channel.send('Cep não encontrado')
                return
            }
            const {cep, address, state, district, city} = json

            channel.send({embed: embed.embedFactory(
                cep,
                '#0099ff',
                undefined,
                'Consulta CEP',
                'https://image.flaticon.com/icons/png/512/854/854878.png',
                undefined,
                `
                **Rua:** ${address}
                **Cidade:** ${city}
                **Bairro:** ${district}
                **Estado:** ${state}
                `
            )})
        })
    }
}

module.exports = Cep