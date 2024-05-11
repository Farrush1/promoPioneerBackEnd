-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
