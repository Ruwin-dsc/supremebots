const Discord = require('discord.js');
const {bot} = require('../../structures/client');
const request = require('request');
const ms = require('enhanced-ms');

module.exports = {
    name: "mybots",
    aliases: ["bots", "bot", "mybot"], 
    description: "Permet de voir vos bots",
    category: "utilitaire" ,
    usage: ["mybots"],

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {*} color 
     * @param {*} prefix 
     * @param {*} footer 
     * @param {string} commandName 
     */
    run: async(client, message, args, color, prefix, footer, commandName) => {
let pass = false

let staff = client.staff

if(!staff.includes(message.author.id) && !client.config.buyers.includes(message.author.id) && client.db.get(`owner_${message.author.id}`) !== true){
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "1" && message.member.roles.cache.some(r => client.db.get(`perm1.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "2" && message.member.roles.cache.some(r => client.db.get(`perm2.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "3" && message.member.roles.cache.some(r => client.db.get(`perm3.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "4" && message.member.roles.cache.some(r => client.db.get(`perm4.${message.guild.id}`)?.includes(r.id))) pass = true;
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "5" && message.member.roles.cache.some(r => client.db.get(`perm5.${message.guild.id}`)?.includes(r.id))) pass = true; 
    if(client.db.get(`perm_${commandName}.${message.guild.id}`) === "public") pass = "oui";   
} else pass = true;

if (pass === false) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)

request(`http://localhost:3000/getuserbots/${message.author.id}`, (error, response, body) => {
    if (error) {
        console.log(error)
        return
    } else {
        if (body === "No bots found") return message.channel.send(`Vous ne possédez aucun bot, pour en acheter rendez-vous ici <#950855325865607268>.`)
        let bots = JSON.parse(body)
        let botList = ""
        bots.forEach(async bot => {
            botList += `[${client.users.cache.get(bot.id) == undefined ? "Introuvable" : client.users.cache.get(bot.id).username}](https://discord.com/api/oauth2/authorize?client_id=${bot.id}&permissions=8&scope=bot) | \`${bot.time - Date.now() <= 0 ? "Expiré" : ms(bot.time - Date.now())}\`\n`
        })
        let mybots = new Discord.MessageEmbed()
        .setColor(color) 
        .setTitle(`Vos bots`)
        .setDescription(botList)
        message.channel.send({ embeds: [mybots] }) 
    }
})  
    }
}