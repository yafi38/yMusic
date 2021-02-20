module.exports = function (message, voiceChannel) {
    if (!voiceChannel) {
        message.channel.send("You must be in a voice channel!");
        return false;
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        message.channel.send("You do not have the correct permissions!");
        return false;
    }

    return true;
}