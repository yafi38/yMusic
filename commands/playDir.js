const playList = require("../utils/playList");
const hasPermission = require('../utils/hasPermission')
const getMusicFiles = require("../utils/getMusicFiles");
const playSong = require("../utils/playSong");

module.exports = {
    name: "playDir",
    description: "Plays all songs from a directory",
    aliases: ["pd"],
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!hasPermission(message, voiceChannel)) {
            return;
        }

        if (!message.member.roles.cache.some((role) => role.name === "yDJ")) {
            message.channel.send("You do not have the permission");
            return;
        }
    
        var dirName = args.join(" ").toLowerCase();
        var songList = getMusicFiles(dirName);
    
        if (songList.length == 0) {
            message.channel.send("No music file found :cry:");
            return;
        }
    
        if (!playList.getQ()) {
            playList.createQ(message.channel, voiceChannel, null);
        }
    
        songList.forEach((song) => {
            playList.getQ().songs.push(song);
        });
    
        message.channel.send(
            `Successfully added ${songList.length} songs to play list`
        );
        try {
            const connection = await voiceChannel.join();
            playList.getQ().connection = connection;
            playSong();
        } catch (err) {
            console.log(err);
            message.channel.send(`Some error occured`);
            playList.deleteQ();
            voiceChannel.leave();
        }
    },
};
