/*
  Warnings:

  - You are about to drop the column `promo_type` on the `PromoType` table. All the data in the column will be lost.
  - Added the required column `name` to the `PromoType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PromoType" DROP COLUMN "promo_type",
ADD COLUMN     "name" TEXT NOT NULL;
