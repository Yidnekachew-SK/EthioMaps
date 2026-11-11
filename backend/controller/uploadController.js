const path = require("path");
const fs = require("fs");
const fileService = require('../services/fileService');

uploadFile = async (req, res) => {

    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please select a file"
            });
        }

        const extension = path.extname(file.originalname).toLowerCase();
        const relativePath = path.relative(process.cwd(),file.path);

        if ([".tif", ".tiff"].includes(extension)) {
            await fileService.storeTiffFileInfo(file, req.body.fileName, relativePath);

            return res.status(200).json({
                success: true,
                message: "File received successfully",
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadFile
}