-- CreateTable
CREATE TABLE "AffiliateCode" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "affiliate_code" TEXT NOT NULL,

    CONSTRAINT "AffiliateCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "product_image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateCode_user_id_key" ON "AffiliateCode"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateCode_affiliate_code_key" ON "AffiliateCode"("affiliate_code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_warehouse_id_key" ON "Product"("warehouse_id");

-- AddForeignKey
ALTER TABLE "AffiliateCode" ADD CONSTRAINT "AffiliateCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "WareHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
