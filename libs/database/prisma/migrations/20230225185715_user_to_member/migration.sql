/*
  Warnings:

  - You are about to drop the column `user_id` on the `Dependents` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `member_id` to the `Dependents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dependents" DROP CONSTRAINT "Dependents_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_user_id_fkey";

-- DropIndex
DROP INDEX "Loan_user_id_idx";

-- AlterTable
ALTER TABLE "Dependents" DROP COLUMN "user_id",
ADD COLUMN     "member_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "user_id",
ADD COLUMN     "member_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "acct_num" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "religion" "Religion" NOT NULL DEFAULT 'CATHOLIC',
    "highest_education" "HighestEducation",
    "contact_num" TEXT,
    "address" TEXT,
    "civil_status" "CivilStatus",
    "age" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gender" "Gender",
    "tin" TEXT,
    "occupation" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_acct_num_key" ON "Member"("acct_num");

-- CreateIndex
CREATE INDEX "Member_first_name_last_name_acct_num_idx" ON "Member"("first_name", "last_name", "acct_num");

-- CreateIndex
CREATE INDEX "Loan_member_id_idx" ON "Loan"("member_id");

-- AddForeignKey
ALTER TABLE "Dependents" ADD CONSTRAINT "Dependents_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
