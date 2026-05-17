-- CreateTable
CREATE TABLE "ExhibitionSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "venue" TEXT,
    "city" TEXT,
    "visitDate" DATETIME,
    "exhibitionType" TEXT,
    "keywords" TEXT NOT NULL DEFAULT '[]',
    "overallImpression" TEXT,
    "curatorialNotes" TEXT,
    "spatialNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ExhibitNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exhibitionSessionId" TEXT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "title" TEXT,
    "artist" TEXT,
    "yearOrPeriod" TEXT,
    "mediumOrMaterial" TEXT,
    "wallLabelText" TEXT,
    "manualContext" TEXT,
    "confirmedFacts" TEXT,
    "visualObservations" TEXT,
    "reasonableSpeculation" TEXT,
    "viewingFocus" TEXT,
    "aiAnalysis" TEXT,
    "designInspiration" TEXT,
    "oneSentenceSummary" TEXT,
    "personalRemarks" TEXT,
    "followUpQuestions" TEXT NOT NULL DEFAULT '[]',
    "informationConfidence" TEXT NOT NULL DEFAULT 'partial',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExhibitNote_exhibitionSessionId_fkey" FOREIGN KEY ("exhibitionSessionId") REFERENCES "ExhibitionSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExhibitImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exhibitNoteId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "originalFilename" TEXT,
    "mimeType" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "imageRole" TEXT NOT NULL DEFAULT 'artwork',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExhibitImage_exhibitNoteId_fkey" FOREIGN KEY ("exhibitNoteId") REFERENCES "ExhibitNote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ExhibitNote_exhibitionSessionId_sequenceNumber_idx" ON "ExhibitNote"("exhibitionSessionId", "sequenceNumber");

-- CreateIndex
CREATE INDEX "ExhibitImage_exhibitNoteId_idx" ON "ExhibitImage"("exhibitNoteId");
