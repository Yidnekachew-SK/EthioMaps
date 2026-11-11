const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadFolder = path.join(
    process.cwd(),
    "uploads",
    "temp"
);

fs.mkdirSync(uploadFolder, {
    recursive: true
});

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },

    filename: (req, file, cb) => {

        const fileName = (req.body.fileName || "file").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");

        const uniqueName = fileName + "-" + Date.now() + "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname).toLowerCase();

        cb(null, uniqueName);
    }

});

const upload = multer({

    storage: storage,

    limits: {
        fileSize: 1024 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        const allowedExtensions = [
            ".geojson",
            ".json",
            ".tif",
            ".tiff"
        ];

        if (!allowedExtensions.includes(extension)) {
            return cb(new Error("Unsupported file type"));
        }

        cb(null, true);
    }

});

module.exports = upload;