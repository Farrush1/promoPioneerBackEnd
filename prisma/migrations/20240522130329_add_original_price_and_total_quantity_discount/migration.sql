/*
  Warnings:

  - Added the required column `total_quantity` to the `CheckoutDiscount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_price` to the `CheckoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckoutDiscount" ADD COLUMN     "total_quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CheckoutItem" ADD COLUMN     "original_price" INTEGER NOT NULL;
