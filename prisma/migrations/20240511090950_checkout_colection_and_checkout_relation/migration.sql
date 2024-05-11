-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_checkout_collection_id_fkey" FOREIGN KEY ("checkout_collection_id") REFERENCES "CheckoutCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
