/*
  Warnings:

  - A unique constraint covering the columns `[promo_id,product_id]` on the table `PromoProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PromoProduct_promo_id_product_id_key" ON "PromoProduct"("promo_id", "product_id");
