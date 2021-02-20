const fs = require("fs");

module.exports = {
    name: "rmv",
    description: "Removes all directories to browse music from",
    execute(message, args) {
        if (!message.member.roles.cache.some((role) => role.name === "yDJ")) {
            message.channel.send("You do not have the permission");
            return;
        }

        fs.writeFile("songList.txt", "", (err) => {
            if (err) {
                console.log(err);
            } else {
                message.channel.send(
                    "Successfully removed all songs from the list"
                );
            }
        });

        fs.writeFile("dirList.txt", "", (err) => {
            if (err) {
                console.log(err);
            } else {
                message.channel.send(
                    "Successfully removed all directories from the list"
                );
            }
        });
    },
};
