const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "antijoin",
    aliases: [],
    description: "Permet de paraméter l'antijoin",
    category: "antiraid",
    usage: ["antijoin <on/off/max>"],
    

    /**
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {

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

    if (args[0] === "on") {
        if (client.db.get(`antijoin.${message.guild.id}`) === "on") return message.channel.send(`L'antijoin est déjà activé.`)
        client.db.set(`antijoin.${message.guild.id}`, "on");
        message.channel.send(`L'antijoin est désormais activé.`)
    }

    if (args[0] === "off") {
        if (!client.db.get(`antijoin.${message.guild.id}`)) return message.channel.send(`L'antijoin est déjà désactivé.`)
        client.db.delete(`antijoin.${message.guild.id}`);
        message.channel.send(`L'antijoin est désormais désactivé.`)
    }

    if (args[0] === "max") {
        if (client.db.get(`antijoin.${message.guild.id}`) === "max") return message.channel.send(`L'antijoin est déjà au maximum.`)
        client.db.set(`antijoin.${message.guild.id}`, "max");
        message.channel.send(`L'antijoin est désormais au maximum.`)
    }

}
}