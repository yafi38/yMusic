const fs = require("fs");
const path = require("path");

const getMusicFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getMusicFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.includes("mp3"))
                arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
};

module.exports = getMusicFiles;
