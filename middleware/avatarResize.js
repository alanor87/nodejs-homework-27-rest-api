const jimp = require('jimp');
const { tempDir } = require('../middleware/avatar');

const avatarResize = (fileOrigin) => {
    jimp.read(fileOrigin, (err, file) => {
        if (err) throw err;
        file.resize(250, 250)
            .write(fileOrigin);
    })
};

module.exports = { avatarResize }