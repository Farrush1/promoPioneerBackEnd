-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "checkout_id" INTEGER NOT NULL,
    "payment_proof" INTEGER NOT NULL,
    "payment_status" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_checkout_id_key" ON "Payment"("checkout_id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
