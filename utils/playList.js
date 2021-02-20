var q = null;

module.exports = {
    getQ() {
        return q;
    },
    createQ(channel, voiceChannel, connection) {
        q = {
            channel: channel,
            voiceChannel: voiceChannel,
            connection: connection,
            songs: [],
        };
        return q;
    },
    deleteQ() {
        if (q != null) {
            q.voiceChannel.leave();
            q = null;
        }
    },
};
