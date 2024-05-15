/*
  Warnings:

  - You are about to drop the column `shipping_price` on the `CheckoutItem` table. All the data in the column will be lost.
  - Added the required column `total_weight` to the `CheckoutItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckoutItem" DROP COLUMN "shipping_price",
ADD COLUMN     "total_weight" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ShippingOption" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "checkout_item_id" INTEGER NOT NULL,

    CONSTRAINT "ShippingOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionCost" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "shipping_option_Id" INTEGER NOT NULL,

    CONSTRAINT "OptionCost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShippingOption" ADD CONSTRAINT "ShippingOption_checkout_item_id_fkey" FOREIGN KEY ("checkout_item_id") REFERENCES "CheckoutItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionCost" ADD CONSTRAINT "OptionCost_shipping_option_Id_fkey" FOREIGN KEY ("shipping_option_Id") REFERENCES "ShippingOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
