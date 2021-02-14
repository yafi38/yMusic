const fs = require('fs')
const getMusicFiles = require('../utils/getMusicFiles')

var q = null

module.exports = {
    name: 'play',
    description: 'Play a song',
    aliases: ['skip', 'stop', 'playdir'],
    async execute(message, commandName, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            message.channel.send('You must be in a voice channel!')
            return
        }

        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            message.channel.send('You do not have the correct permissions!')
            return
        }

        if (commandName === 'play') {
            play(message, voiceChannel, args)
        } else if (commandName === 'stop') {
            q = null
            await voiceChannel.leave()
            await message.channel.send('Leaving channel :smiling_face_with_tear: ')
        } else if (commandName === 'skip') {
            if (!q) {
                message.channel.send('Nothing to skip :sweat_smile:')
            } else {
                q.connection.dispatcher.end()
            }
        } else if (commandName === 'playdir') {
            playDir(message, voiceChannel, args)
        }
    }
}


const play = async (message, voiceChannel, args) => {
    var songName = args.join(' ').toLowerCase()
    var songPath = null

    try {
        const data = fs.readFileSync('songList.txt', 'UTF-8')

        const songList = data.split(/\r?\n/)
        const totalSongs = songList.length

        for (var i = 0; i < totalSongs; i++) {
            if (songList[i].toLowerCase().includes(songName)) {
                songPath = songList[i]
                break
            }
        }
    } catch (err) {
        console.log(err)
    }

    if (songPath) {
        if (!q) {

            q = {
                channel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: []
            }
            q.songs.push(songPath)

            try {
                const connection = await voiceChannel.join()
                q.connection = connection
                playSong(q)
            } catch (err) {
                console.log(err)
                message.channel.send(`Some error occured`)
                q = null
                voiceChannel.leave()
            }
        } else {
            q.songs.push(songPath)
            message.channel.send(`:clock3: **${songPath.replace(/.+\\/, '').replace('.mp3', '')}** added to the queue`)
        }
    } else {
        message.channel.send(`Could not find the song :cry:`)
    }
}


const playDir = async (message, voiceChannel, args) => {
    if (!message.member.roles.cache.some(role => role.name === 'yDJ')) {
        message.channel.send('You do not have the permission')
        return
    }
    
    var dirName = args.join(' ').toLowerCase()
    var songList = getMusicFiles(dirName)

    if (songList.length == 0) {
        message.channel.send('No music file found :cry:')
        return
    }

    if (!q) {
        q = {
            channel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: []
        }
    }

    songList.forEach(song => {
        q.songs.push(song)
    })

    message.channel.send(`Successfully added ${songList.length} songs to play list`)
    try {
        const connection = await voiceChannel.join()
        q.connection = connection
        playSong(q)
    } catch (err) {
        console.log(err)
        message.channel.send(`Some error occured`)
        q = null
        voiceChannel.leave()
    }
}





const playSong = async () => {
    if (q.songs.length == 0) {
        q.voiceChannel.leave()
        q = null
        return
    }

    song = q.songs.shift()
    q.channel.send(`:arrow_forward: Now playing **${song.replace(/.+\\/, '').replace('.mp3', '')}**`)
    q.connection.play(song, { seek: 0, volume: 1 })
        .on('finish', () => {
            playSong(q)
        })

}