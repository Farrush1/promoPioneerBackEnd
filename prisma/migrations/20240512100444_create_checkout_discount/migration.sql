-- CreateTable
CREATE TABLE "CheckoutDiscount" (
    "id" SERIAL NOT NULL,
    "checkout_colection_id" INTEGER NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "discount_percent" INTEGER NOT NULL,
    "discount_price" INTEGER NOT NULL,

    CONSTRAINT "CheckoutDiscount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckoutDiscount" ADD CONSTRAINT "CheckoutDiscount_checkout_colection_id_fkey" FOREIGN KEY ("checkout_colection_id") REFERENCES "CheckoutCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckoutDiscount" ADD CONSTRAINT "CheckoutDiscount_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
