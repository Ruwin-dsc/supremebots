const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "buyer",
    aliases: [],
    description: "Permet de lister, d'ajouter ou de supprimer des buyers",
    category: "proprio",
    usage: ["buyer add <utilisateur>", "buyer remove <utilisateur>"],

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
        let list = args[0] === "list"
        let add = args[0] === "add"
        let remove = args[0] === "remove"
    
        if (add) {
            let buyer = message.mentions.users.first()
            if (!buyer) return message.reply("Veuillez mentionner un utilisateur")
    
            let config = client.config
            let buyers = config.buyers
    
            if (buyers.includes(buyer.id)) return message.reply("Cet utilisateur est déjà dans la liste des buyers")
    
            buyers.push(buyer.id)
            client.config.buyers = buyers
    
            fs.writeFile("./config.json", JSON.stringify(client.config, null, 4), err => {
                if (err) throw err
                message.reply("L'utilisateur a bien été ajouté à la liste des buyers")
            })
        }
    
        if (remove) {
            let buyer = message.mentions.users.first()
            if (!buyer) return message.reply("Veuillez mentionner un utilisateur")
    
            let config = client.config
            let buyers = config.buyers
    
            if (!buyers.includes(buyer.id)) return message.reply("Cet utilisateur n'est pas dans la liste des buyers")
    
            buyers.splice(buyers.indexOf(buyer.id), 1)
            client.config.buyers = buyers
    
            fs.writeFile("./config.json", JSON.stringify(client.config, null, 4), err => {
                if (err) throw err
                message.reply("L'utilisateur a bien été retiré de la liste des buyers")
            })
        }
    })


}
}