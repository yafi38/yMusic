require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const prefix = 'y!'

client.once('ready', ()=> {
    console.log('Ready!')
})


client.on('message', message => {
    // console.log(message.content)

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(' ')
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) {
        message.reply('Unknown Command')
        return
    }

    try {
        command.execute(message, commandName, args)
    }  catch (error) {
        console.log(error)
        message.reply('Error Occured')
    }

})



client.login(process.env.TOKEN)