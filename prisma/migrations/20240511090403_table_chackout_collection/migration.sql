/*
  Warnings:

  - You are about to drop the column `shipping_id` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `total_shipping_price` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `total_weight` on the `CheckoutItem` table. All the data in the column will be lost.
  - You are about to drop the column `checkout_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `OptionCost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingService` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[checkout_collection_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkout_collection_id` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_id` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_name` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_price` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_service` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_checkout_price` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_weight` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkout_collection_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_shipping_id_fkey";

-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckoutItem" DROP CONSTRAINT "CheckoutItem_checkout_id_fkey";

-- DropForeignKey
ALTER TABLE "OptionCost" DROP CONSTRAINT "OptionCost_shipping_option_Id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_checkout_id_fkey";

-- DropForeignKey
ALTER TABLE "ShippingOption" DROP CONSTRAINT "ShippingOption_checkout_item_id_fkey";

-- DropIndex
DROP INDEX "Payment_checkout_id_key";

-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "shipping_id",
DROP COLUMN "total_price",
DROP COLUMN "total_shipping_price",
DROP COLUMN "user_id",
ADD COLUMN     "checkout_collection_id" INTEGER NOT NULL,
ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "shipping_name" TEXT NOT NULL,
ADD COLUMN     "shipping_price" INTEGER NOT NULL,
ADD COLUMN     "shipping_service" TEXT NOT NULL,
ADD COLUMN     "total_checkout_price" INTEGER NOT NULL,
ADD COLUMN     "total_weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CheckoutItem" DROP COLUMN "total_weight";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "checkout_id",
ADD COLUMN     "checkout_collection_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "OptionCost";

-- DropTable
DROP TABLE "ShippingOption";

-- DropTable
DROP TABLE "ShippingService";

-- CreateTable
CREATE TABLE "CheckoutCollection" (
    "id" SERIAL NOT NULL,
    "total_item_price" INTEGER NOT NULL,
    "total_shipping_price" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "CheckoutCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutCollection_user_id_key" ON "CheckoutCollection"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_checkout_collection_id_key" ON "Payment"("checkout_collection_id");

-- AddForeignKey
ALTER TABLE "CheckoutCollection" ADD CONSTRAINT "CheckoutCollection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_checkout_collection_id_fkey" FOREIGN KEY ("checkout_collection_id") REFERENCES "CheckoutCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
