/*
  Warnings:

  - Added the required column `weight` to the `CheckoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckoutItem" ADD COLUMN     "weight" INTEGER NOT NULL;
