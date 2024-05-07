-- CreateTable
CREATE TABLE "Checkout" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "subtotal_price" INTEGER NOT NULL,
    "shipping_id" INTEGER NOT NULL,
    "total_shipping_price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "ShippingService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
