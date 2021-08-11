const path = require('path');
const multer = require('multer')
const tempDir = path.join(process.cwd(), 'tmp');
const uploadDir = path.join(process.cwd(), 'public/avatars');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const avatarUpload = multer({
    storage: storage,
})

module.exports = { avatarUpload, tempDir, uploadDir };