-- AlterTable
ALTER TABLE "Checkout" ALTER COLUMN "subtotal_price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CheckoutCollection" ALTER COLUMN "total_item_price" DROP NOT NULL;
