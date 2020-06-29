const request = require('request')
const embed = require('../view/embedFactory')
const { parse } = require('node-html-parser');

class Market {

    constructor(url){
        this.url = url
    }
     sendEmbed(sender, channel) {
         console.log('market class' + this.url)
        request(this.url,  (error, response, data) => {
            if(error){
                channel.send('Anúncio não encontrado.')
                return
            }
            const marketType = `${this.url}`.split('//')[1].split('.')[1].trim();
            if(marketType.startsWith('olx')){
                const estado = `${this.url}`.split('//')[1].split('.')[0].trim().toUpperCase();
                console.log(estado)
                const root = parse(data)
                const image = root.querySelector('.image').getAttribute('src');
                const item = root.querySelectorAll('.sc-ifAKCX')[2].innerHTML;
                const preco = root.querySelectorAll('.sc-ifAKCX')[1].innerHTML;
                const publicado = root.querySelectorAll('.sc-ifAKCX')[3].innerHTML;
                const descricao = root.querySelectorAll('.sc-ifAKCX')[8].innerHTML;
                channel.send({embed: embed.embedFactory(
                    `${item}\nver anúncio...`,
                    '#700ad6',
                    this.url,
                    `OLX - ${estado}`,`https://apprecs.org/ios/images/app-icons/256/7f/692808319.jpg`,undefined,
                    `**Preço**: ${preco}
                    ${descricao}
                    ${channel.guild.roles.cache.find(f => f.name === "OLX")}`, undefined, undefined, image, publicado
                )})
            }
            
        })
     }
    
}
module.exports = Market