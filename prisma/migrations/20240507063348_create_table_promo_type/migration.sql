/*
  Warnings:

  - Added the required column `promo_type_id` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "promo_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoType" (
    "id" SERIAL NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "promo_type" TEXT NOT NULL,

    CONSTRAINT "PromoType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_key" ON "Cart"("user_id");

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_promo_type_id_fkey" FOREIGN KEY ("promo_type_id") REFERENCES "PromoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
