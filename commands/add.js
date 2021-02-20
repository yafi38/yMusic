const fs = require("fs");

const browseDirectory = require("../utils/browseDirectory");

module.exports = {
    name: "add",
    description: "Adds a directory to browse music from",
    execute(message, args) {
        if (!message.member.roles.cache.some((role) => role.name === "yDJ")) {
            message.channel.send("You do not have the permission");
            return;
        }

        var dirName = args.join(" ").toLowerCase();
        var [arrayOfFiles, arrayOfDirectory] = browseDirectory(dirName);
        var buffer = "";

        arrayOfFiles.forEach((fileName) => {
            buffer = buffer.concat(fileName, "\n");
        });

        fs.appendFile("songList.txt", buffer, (err) => {
            if (err) {
                console.log(err);
                message.channel.send("Error occured!");
            } else {
                // console.log(`Successfully added ${arrayOfFiles.length} songs to list`);
                message.channel.send(
                    `Successfully added ${arrayOfFiles.length} songs to catalog`
                );
            }
        });

        buffer = ""
        arrayOfDirectory.forEach((fileName) => {
            buffer = buffer.concat(fileName, "\n");
        });


        fs.appendFile("dirList.txt", buffer, (err) => {
            if (err) {
                console.log(err);
                message.channel.send("Error occured!");
            } else {
                // console.log(`Successfully added ${arrayOfDirectory.length} folders to list`);
                message.channel.send(
                    `Successfully added ${arrayOfDirectory.length} folders to catalog`
                );
            }
        });
    },
};
