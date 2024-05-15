/*
  Warnings:

  - A unique constraint covering the columns `[checkout_colection_id,promo_id]` on the table `CheckoutDiscount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CheckoutDiscount_checkout_colection_id_promo_id_key" ON "CheckoutDiscount"("checkout_colection_id", "promo_id");
