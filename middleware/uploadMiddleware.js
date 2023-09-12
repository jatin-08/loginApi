const multer = require("multer");
const fs = require("fs");
// const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "./upload";
        fs.mkdirSync(uploadDir, { recursive: true });
        return cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
})

const upload = multer({ storage });
module.exports = { upload };