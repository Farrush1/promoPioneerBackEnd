/*
  Warnings:

  - A unique constraint covering the columns `[promo_id]` on the table `CheckoutDiscount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CheckoutDiscount_promo_id_key" ON "CheckoutDiscount"("promo_id");
