/*
  Warnings:

  - You are about to drop the `FAQTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FAQTranslation" DROP CONSTRAINT "FAQTranslation_faqId_fkey";

-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "answer_bn" TEXT,
ADD COLUMN     "answer_hi" TEXT,
ADD COLUMN     "question_bn" TEXT,
ADD COLUMN     "question_hi" TEXT;

-- DropTable
DROP TABLE "FAQTranslation";
