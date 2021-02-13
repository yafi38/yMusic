const fs = require('fs')


module.exports = {
    name: 'rmv',
    description: 'Removes all directories to browse music from',
    execute(message, commandName, args) {

        if (!message.member.roles.cache.some(role => role.name === 'yDJ')) {
            message.channel.send('You do not have the permission')
            return
        }

        fs.writeFile('songList.txt', '', err => {
            if (err) {
                console.log(err)
            } else {
                message.channel.send('Successfully removed all directory from the list')
            }
        })
        
    }
}