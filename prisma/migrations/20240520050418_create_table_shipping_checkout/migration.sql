-- CreateTable
CREATE TABLE "shippingCheckout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "checkout_id" INTEGER NOT NULL,

    CONSTRAINT "shippingCheckout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shippingCheckout_checkout_id_key" ON "shippingCheckout"("checkout_id");

-- AddForeignKey
ALTER TABLE "shippingCheckout" ADD CONSTRAINT "shippingCheckout_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
