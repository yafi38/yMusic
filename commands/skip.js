const playList = require("../utils/playList");

module.exports = {
    name: "skip",
    description: "Skip the song that is currently playing",
    aliases: ["sk"],
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!playList.getQ()) {
            message.channel.send("Nothing to skip :sweat_smile:");
        } else if (playList.getQ().voiceChannel.id !== voiceChannel.id) {
            message.channel.send("You and I are not in the same channel :confused:");
        } else {
            playList.getQ().connection.dispatcher.end();
        }
    },
};
