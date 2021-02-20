const fs = require("fs");
const playList = require("../utils/playList");
const hasPermission = require('../utils/hasPermission')
const browseDirectory = require("../utils/browseDirectory");
const playSong = require("../utils/playSong");

module.exports = {
    name: "playDir",
    description: "Plays all songs from a directory",
    aliases: ["pd"],
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!hasPermission(message, voiceChannel)) {
            return;
        }

        var dirName = args.join(" ").toLowerCase();
        var dirPath = null

        try {
            const data = fs.readFileSync("dirList.txt", "UTF-8");

            const dirList = data.split(/\r?\n/);
            const totalDirs = dirList.length;

            for (var i = 0; i < totalDirs; i++) {
                if (dirList[i].toLowerCase().includes(dirName)) {
                    dirPath = dirList[i];
                    break;
                }
            }
        } catch (err) {
            console.log(err);
        }

        if (dirPath) {
            console.log(dirPath);
            var [songList, _] = browseDirectory(dirPath);

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
        } else {
            message.channel.send(`Could not find the directory :cry:`);
        }
    },
};
