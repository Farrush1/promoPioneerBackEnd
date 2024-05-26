/*
  Warnings:

  - The values [INCOMPLETED] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('UNCOMPLETED', 'PENDING', 'WAITING', 'SUCCESS', 'FAILED');
ALTER TABLE "CheckoutCollection" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "Payment" ALTER COLUMN "payment_status" TYPE "STATUS_new" USING ("payment_status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
COMMIT;
