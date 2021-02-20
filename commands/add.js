const fs = require("fs");

const getMusicFiles = require("../utils/getMusicFiles");

module.exports = {
    name: "add",
    description: "Adds a directory to browse music from",
    execute(message, commandName, args) {
        if (!message.member.roles.cache.some((role) => role.name === "yDJ")) {
            message.channel.send("You do not have the permission");
            return;
        }

        var dirName = args.join(" ").toLowerCase();
        var arrayOfFiles = getMusicFiles(dirName);
        var allFileNames = "";

        arrayOfFiles.forEach((fileName) => {
            allFileNames = allFileNames.concat(fileName, "\n");
        });

        fs.appendFile("songList.txt", allFileNames, (err) => {
            if (err) {
                console.log(err);
                message.channel.send("Error occured!");
            } else {
                console.log(`Successfully added ${arrayOfFiles.length} songs to list`);
                message.channel.send(
                    `Successfully added ${arrayOfFiles.length} songs to catalog`
                );
            }
        });
    },
};
