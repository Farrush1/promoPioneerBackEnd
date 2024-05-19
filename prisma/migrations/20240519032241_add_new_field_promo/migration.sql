/*
  Warnings:

  - You are about to drop the column `isLimited` on the `Promo` table. All the data in the column will be lost.
  - Added the required column `isLimitedQuantity` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLimitedTime` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promo" DROP COLUMN "isLimited",
ADD COLUMN     "isLimitedQuantity" BOOLEAN NOT NULL,
ADD COLUMN     "isLimitedTime" BOOLEAN NOT NULL;
