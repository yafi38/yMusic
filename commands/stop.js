const playList = require("../utils/playList");

module.exports = {
    name: "stop",
    description: "Stop playing song and leave the voice channel",
    aliases: ["st"],
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!playList.getQ()) {
            message.channel.send("I am not playing anything! :sweat_smile:");
        } else if (playList.getQ().voiceChannel.id !== voiceChannel.id) {
            message.channel.send("You and I are not in the same channel :confused:");
        } else {
            playList.deleteQ();
            await message.channel.send("Leaving channel :smiling_face_with_tear: ");
        }
    },
};
