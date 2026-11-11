-- CreateTable
CREATE TABLE "GeoTiffFiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GeoTiff',
    "filePath" TEXT NOT NULL,
    "fileSizeInMb" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoTiffFiles_pkey" PRIMARY KEY ("id")
);
