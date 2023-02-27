-- CreateEnum
CREATE TYPE "HighestEducation" AS ENUM ('ELEMENTARY', 'SECONDARY', 'COLLEGE', 'GRADUATE', 'POST_GRADUATE', 'OTHER');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'WIDOWED', 'SEPARATED', 'DIVORCED', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('ADMIN', 'STAFF', 'ACCOUNTANT');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'SHARE_CAPITAL', 'MORTUARY');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'LOAN', 'PAYMENT');

-- CreateEnum
CREATE TYPE "LoanPaymentMode" AS ENUM ('MONTHLY', 'QUARTERLY', 'SEMI_ANNUALLY', 'ANNUALLY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "civil_status" "CivilStatus",
ADD COLUMN     "contact_num" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "highest_education" "HighestEducation",
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "tin" TEXT;

-- CreateTable
CREATE TABLE "Dependents" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "relationship" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "contact_num" TEXT,
    "role" "StaffRole" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "acct_num" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "acct_num" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "amount_word" TEXT,
    "interest" DOUBLE PRECISION,
    "penalty" DOUBLE PRECISION,
    "other" DOUBLE PRECISION,
    "receiver_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "principal" DOUBLE PRECISION NOT NULL,
    "term" INTEGER NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "penalty" DOUBLE PRECISION NOT NULL,
    "mode" "LoanPaymentMode" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_username_key" ON "Staff"("username");

-- CreateIndex
CREATE INDEX "Staff_first_name_last_name_username_idx" ON "Staff"("first_name", "last_name", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_acct_num_key" ON "Accounts"("acct_num");

-- CreateIndex
CREATE INDEX "Transactions_acct_num_idx" ON "Transactions"("acct_num");

-- CreateIndex
CREATE INDEX "Loan_user_id_idx" ON "Loan"("user_id");

-- AddForeignKey
ALTER TABLE "Dependents" ADD CONSTRAINT "Dependents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
