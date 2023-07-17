const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "derank",
    aliases: [],
    description: "Permet de derank l'utilisateur mentionné",
    category: "moderation",
    usage: ["derank <utilisateur> [raison]"],

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

        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let raison = args.slice(1).join(' ') || `Aucune raison`;
        
        if (client.db.get(`owner_${user.user.id}`) === true || client.config.buyers.includes(user.user.id)) return message.channel.send(`Vous ne pouvez pas derank cet utilisateur.`)


            await message.guild.members.cache.get(user.id).roles.set([])
                message.reply(`${user.user.username} a été **derank** pour \`${raison}\``)
                await user.send(`Vous avez été **derank** du serveur ${message.guild.name}`)
                let sanction = {
                    type: "derank",
                    _id: Math.floor(Math.random() * 9999),
                    user: user.user.id,
                    raison: raison,
                    date: new Date(),
                    mod: message.author.id
                }
                client.db.push(`sanctions_${message.guild.id}`, sanction)


        let Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`${message.author} a derank ${user} pour \`${raison}\``)
        .setTimestamp()
        .setFooter(footer)
        message.guild.channels.cache.get(client.db.get(`modlogs_${message.guild.id}`))?.send({ embeds: [Embed] })


    }
}