-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_shipping_id_fkey";

-- AlterTable
ALTER TABLE "Checkout" ALTER COLUMN "total_price" DROP NOT NULL,
ALTER COLUMN "shipping_id" DROP NOT NULL,
ALTER COLUMN "total_shipping_price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "ShippingService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
