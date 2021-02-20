const playList = require("../utils/playList");

const playSong = async function () {
    if (playList.getQ().songs.length == 0) {
        playList.deleteQ();
        return;
    }

    song = playList.getQ().songs.shift();
    playList
        .getQ()
        .channel.send(
            `:arrow_forward: Now playing **${song
                .replace(/.+\\/, "")
                .replace(".mp3", "")}**`
        );
    playList
        .getQ()
        .connection.play(song, { seek: 0, volume: 0.5 })
        .on("finish", () => {
            playSong();
        });
}

module.exports = playSong;