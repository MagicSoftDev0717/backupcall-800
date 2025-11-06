/*
  Warnings:

  - A unique constraint covering the columns `[userId,phoneE164]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Contact_userId_fullName_key";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_phoneE164_key" ON "Contact"("userId", "phoneE164");
