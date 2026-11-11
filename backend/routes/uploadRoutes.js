const { Router } = require("express");
const path = require("path");
const uploadController = require('../controller/uploadController');
const upload = require("../middleware/geoTiffUpload");
const geoJSONUpload = require("../middleware/geoJSONUpload");

const uploadRouter = Router();

const processGeoJSON = (req, res) => {
    return res.status(501).json({
        success: false,
        message: "GeoJSON processing will be implemented later"
    });
};

const routeFile = (req, res, next) => {

    const extension = path.extname(req.headers["file-name"] || "").toLowerCase();

    if ([".geojson", ".json"].includes(extension)) {
        return processGeoJSON(req, res, next);
    }

    if ([".tif", ".tiff"].includes(extension)) {
        return upload.single("file")(req, res, (err) => {
            if (err) return next(err);
            return uploadController.uploadFile(req, res, next);
        });
    }

    return res.status(400).json({
        success: false,
        message: "Unsupported file type"
    });
};

uploadRouter.post("/upload", routeFile);

module.exports = uploadRouter;