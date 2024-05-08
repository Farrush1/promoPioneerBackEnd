-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_city_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "city_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
