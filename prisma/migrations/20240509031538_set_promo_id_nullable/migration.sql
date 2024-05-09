-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_promo_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "promo_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
