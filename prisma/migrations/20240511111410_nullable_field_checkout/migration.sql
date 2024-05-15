/*
  Warnings:

  - Added the required column `total_specific_price` to the `CheckoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkout" ALTER COLUMN "shipping_name" DROP NOT NULL,
ALTER COLUMN "shipping_price" DROP NOT NULL,
ALTER COLUMN "shipping_service" DROP NOT NULL,
ALTER COLUMN "total_checkout_price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CheckoutCollection" ALTER COLUMN "total_shipping_price" DROP NOT NULL,
ALTER COLUMN "total_price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CheckoutItem" ADD COLUMN     "total_specific_price" INTEGER NOT NULL;
