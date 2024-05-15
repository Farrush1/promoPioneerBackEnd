/*
  Warnings:

  - You are about to drop the column `promo_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_promo_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "promo_id";

-- CreateTable
CREATE TABLE "PromoProduct" (
    "id" SERIAL NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "PromoProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromoProduct" ADD CONSTRAINT "PromoProduct_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoProduct" ADD CONSTRAINT "PromoProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
