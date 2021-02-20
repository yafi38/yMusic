const fs = require("fs");
const playList = require("../utils/playList");
const hasPermission = require("../utils/hasPermission");
const playSong = require("../utils/playSong");

module.exports = {
    name: "play",
    description: "Play a song",
    aliases: ["p"],
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!hasPermission(message, voiceChannel)) {
            return;
        }

        var songName = args.join(" ").toLowerCase();
        var songPath = null;

        try {
            const data = fs.readFileSync("songList.txt", "UTF-8");

            const songList = data.split(/\r?\n/);
            const totalSongs = songList.length;

            for (var i = 0; i < totalSongs; i++) {
                if (songList[i].toLowerCase().includes(songName)) {
                    songPath = songList[i];
                    break;
                }
            }
        } catch (err) {
            console.log(err);
        }

        if (songPath) {
            if (!playList.getQ()) {
                playList.createQ(message.channel, voiceChannel, null);

                playList.getQ().songs.push(songPath);

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
                playList.getQ().songs.push(songPath);
                message.channel.send(
                    `:clock3: **${songPath
                        .replace(/.+\\/, "")
                        .replace(".mp3", "")}** added to the queue`
                );
            }
        } else {
            message.channel.send(`Could not find the song :cry:`);
        }

    },
};


