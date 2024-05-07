-- CreateTable
CREATE TABLE "ShippingService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,

    CONSTRAINT "ShippingService_pkey" PRIMARY KEY ("id")
);
