const { Router } = require("express");
const uploadController = require('../controller/uploadController')

const uploadRouter = Router();

const upload = require("../middleware/upload");

uploadRouter.post(
    "/upload",
    upload.single("file"),
    uploadController.uploadFile
);

module.exports = uploadRouter;