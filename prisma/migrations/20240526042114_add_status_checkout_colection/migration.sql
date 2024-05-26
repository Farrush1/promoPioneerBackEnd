/*
  Warnings:

  - You are about to drop the column `status` on the `Checkout` table. All the data in the column will be lost.
  - Added the required column `status` to the `CheckoutCollection` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `payment_status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('INCOMPLETED', 'PENDING', 'WAITING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "CheckoutCollection" ADD COLUMN     "status" "STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "STATUS" NOT NULL;
