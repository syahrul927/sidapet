-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'VALIDATED', 'DONE');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestDocument" (
    "id" TEXT NOT NULL,
    "documentCode" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentConter" TEXT NOT NULL,
    "templatePath" TEXT NOT NULL,
    "formatDocument" JSONB NOT NULL,
    "status" "Status" NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "ownerName" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "RequestDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestDocumentHistory" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "requestDocumentId" TEXT NOT NULL,

    CONSTRAINT "RequestDocumentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounterCategoryDocument" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "counter" INTEGER NOT NULL,

    CONSTRAINT "CounterCategoryDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RequestDocument_id_key" ON "RequestDocument"("id");

-- CreateIndex
CREATE INDEX "RequestDocument_status_createdDate_idx" ON "RequestDocument"("status", "createdDate" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "RequestDocumentHistory_id_key" ON "RequestDocumentHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CounterCategoryDocument_id_key" ON "CounterCategoryDocument"("id");

-- CreateIndex
CREATE INDEX "CounterCategoryDocument_code_year_idx" ON "CounterCategoryDocument"("code", "year");

-- CreateIndex
CREATE UNIQUE INDEX "CounterCategoryDocument_code_year_key" ON "CounterCategoryDocument"("code", "year");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestDocumentHistory" ADD CONSTRAINT "RequestDocumentHistory_requestDocumentId_fkey" FOREIGN KEY ("requestDocumentId") REFERENCES "RequestDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
