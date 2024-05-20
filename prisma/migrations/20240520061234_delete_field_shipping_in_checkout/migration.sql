/*
  Warnings:

  - You are about to drop the column `shipping_name` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_price` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_service` on the `Checkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "shipping_name",
DROP COLUMN "shipping_price",
DROP COLUMN "shipping_service";

-- AlterTable
ALTER TABLE "shippingCheckout" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "service" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
