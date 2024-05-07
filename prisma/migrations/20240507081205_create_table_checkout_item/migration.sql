-- CreateTable
CREATE TABLE "CheckoutItem" (
    "id" SERIAL NOT NULL,
    "checkout_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "shipping_price" INTEGER NOT NULL,

    CONSTRAINT "CheckoutItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
