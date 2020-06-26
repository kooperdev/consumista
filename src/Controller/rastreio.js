const request = require('request')
const embed = require('../view/embedFactory')
'use strict';

class Rastreio {
    constructor(codigo) {
        this.codigo = codigo
        this.url = `https://kooper.dev/apis/rastreio/?obj=${this.codigo}`;
    }
    async sendEmbed(sender, channelMessage) {
        request(this.url, async (error, response, body) => {
            if(response.statusCode != 200){
                channelMessage.send("Site dos correios não está respondendo.")
                return
            }
            const json = await JSON.parse(body)
            if(json['erro']){
                channelMessage.send(json['msg'])
                return
            }
            const fields =  new Array()
            let lastUpdate;
            let lastAction
            for (const key in json) {
                if(key == 0){
                    const {action, message, date, hour, change, location} = json[key]
                    const origem = `__**Origem:**__ ${location}`.replace("/", "")
                    let formatedMessage
                    if(`${message}`.split('para')){
                        formatedMessage = `${message}`.split('para')[1]
                    }else{
                        formatedMessage = `${message}`
                    }
                    let destino =  (formatedMessage) ? `__**Destino:**__ ${formatedMessage}`.replace("/", ""): ""
                    console.log(action === message)
                    lastUpdate = `${origem}\n${destino}`
                    lastAction = `${action}\n${date} às ${hour}`
                }
            }
            channelMessage.send({
                embed: embed.embedFactory(
                    `${lastAction}`,
                    0xEFFE00,
                    undefined,
                    `Correios do Brasil - ${this.codigo}`,
                    'https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/404912/regular_correios-logo-2.png',
                    undefined, lastUpdate,
                    'https://img.apksum.com/07/com.greencode.rastreio/1.0.19/icon.png',
                    fields,
                    undefined,
                    'Em trânsito há 13 dias',
                    undefined)
            })
            console.log('sending Message')
        })

    }
}
module.exports = Rastreio