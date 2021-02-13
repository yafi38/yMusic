const fs = require('fs')
const path = require('path')


const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            if (file.includes('mp3'))
                arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

module.exports = {
    name: 'add',
    description: 'Adds a directory to browse music from',
    execute(message, commandName, args) {

        if (!message.member.roles.cache.some(role => role.name === 'yDJ')) {
            message.channel.send('You do not have the permission')
            return
        }

        var dirName = args.join(' ').toLowerCase()
        arrayOfFiles = getAllFiles(dirName)
        var allFileNames = ''

        console.log(arrayOfFiles.length)
        
        arrayOfFiles.forEach(fileName => {
            allFileNames = allFileNames.concat(fileName, '\n')
            // console.log(fileName)
        });
        
        fs.appendFile('songList.txt', allFileNames, err => {
            if (err) {
                console.log(err)
                message.channel.send('Error occured!')
            } else {
                console.log(`Successfully added ${arrayOfFiles.length} songs to list`)
                message.channel.send(`Successfully added ${arrayOfFiles.length} songs to list`)
            }
        })
    }
}