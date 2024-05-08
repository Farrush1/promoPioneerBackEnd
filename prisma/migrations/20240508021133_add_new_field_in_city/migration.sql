/*
  Warnings:

  - You are about to drop the column `rajaongkirId` on the `City` table. All the data in the column will be lost.
  - Added the required column `postal_code` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_name` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rajaongkir_city_id` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rajaongkir_province_id` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "rajaongkirId",
ADD COLUMN     "postal_code" INTEGER NOT NULL,
ADD COLUMN     "province_name" TEXT NOT NULL,
ADD COLUMN     "rajaongkir_city_id" INTEGER NOT NULL,
ADD COLUMN     "rajaongkir_province_id" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
