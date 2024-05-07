-- CreateTable
CREATE TABLE "WareHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "WareHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WareHouse" ADD CONSTRAINT "WareHouse_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
