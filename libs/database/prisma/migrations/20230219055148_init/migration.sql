-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('CATHOLIC', 'CHRISTIAN', 'MUSLIM', 'BUDDHIST', 'HINDU', 'JEWISH', 'SIKH', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "acct_num" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "religion" "Religion" NOT NULL DEFAULT 'CATHOLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_acct_num_key" ON "User"("acct_num");

-- CreateIndex
CREATE INDEX "User_first_name_last_name_acct_num_idx" ON "User"("first_name", "last_name", "acct_num");
