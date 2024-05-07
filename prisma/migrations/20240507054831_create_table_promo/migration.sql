-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discount_percent" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isLimited" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promo_name_key" ON "Promo"("name");
