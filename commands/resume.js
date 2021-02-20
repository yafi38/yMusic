const playList = require("../utils/playList");

module.exports = {
    name: "resume",
    description: "Resume paused song",
    aliases: ["rs"],
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!playList.getQ()) {
            message.channel.send("I am not playing anything! :sweat_smile:");
        } else if (playList.getQ().voiceChannel.id !== voiceChannel.id) {
            message.channel.send("You and I are not in the same channel :confused:");
        } else if (!playList.getQ() || !playList.getQ().connection.dispatcher.paused) {
            message.channel.send("Nothing to resume :sweat_smile:");
        } else {
            playList.getQ().connection.dispatcher.resume();
        }
    },
};
