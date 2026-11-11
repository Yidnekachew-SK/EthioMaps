const { prisma } = require('../lib/prisma');

async function storeTiffFileInfo(file, fileName, filePath) {
    await prisma.geoTiffFiles.create({
        data: {
            name: fileName,
            originalName: file.originalname,
            filePath: filePath,
            fileSizeInMb: (file.size / (1024 * 1024)).toFixed(2)
        }
    });
}

/*
async function storeGeoJSONFileInfo(file, fileName, tableName) {
    await prisma.geoJsonFiles.create({
        data: {
            name: fileName,
            originalName: file.originalname,
            tableName: tableName,
            fileSizeInMb: (file.size / (1024 * 1024)).toFixed(2)
        }
    });
}
*/

module.exports = {
    storeTiffFileInfo,
}