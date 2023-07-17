const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "buyers",
    aliases: [],
    description: "Permet de lister les buyers",
    category: "proprio",
    usage: ["buyers"],

    /**
     * @param {bot} client  
     * @param {Discord.Message} message 
     * @param {Array<>} args 
     * @param {string} commandName 
     */

    run: async (client, message, args, color, prefix, footer, commandName) => {


    request(`http://localhost:3000/getbuyer/${client.user.id}`, (err, res, body) => {
        let data = JSON.parse(body).body
        if(data !== message.author.id) return message.reply("Vous n'êtes pas l'acheteur de ce bot")
        let config = client.config
        let buyers = config.buyers

        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Liste des buyers")
        .setDescription(buyers.map(buyer => `<@${buyer}>`).join("\n"))
        .setFooter(footer)
        
        message.channel.send({ embeds: [embed] })
    
    })

}
}