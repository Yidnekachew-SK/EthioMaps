const path = require("path");
const fs = require("fs");

uploadFile = async (req, res) => {

    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please select a file"
            });
        }

        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        let fileType;

        if ([".geojson", ".json"].includes(extension)) {
            fileType = "GeoJSON";
        } else if ([".tif", ".tiff"].includes(extension)) {
            fileType = "GeoTIFF";
        }

        return res.status(200).json({
            success: true,
            message: "File received successfully",
            file: {
                originalName: file.originalname,
                storedName: file.filename,
                size: file.size,
                type: fileType,
                temporaryPath: file.path
            }
        });

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