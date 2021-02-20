const fs = require("fs");
const path = require("path");

const browseDirectory = function (dirPath, arrayOfFiles, arrayOfDirectory) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];
    arrayOfDirectory = arrayOfDirectory || [];

    files.forEach(function (file) {
        var curPath = dirPath + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
            arrayOfDirectory.push(path.join(dirPath + "/" + file))
            [arrayOfFiles, arrayOfDirectory] = browseDirectory(curPath, arrayOfFiles, arrayOfDirectory);
        } else {
            if (file.includes("mp3"))
                arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return [arrayOfFiles, arrayOfDirectory];
};

module.exports = browseDirectory;
