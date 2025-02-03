/*
  Warnings:

  - You are about to drop the column `answer_bn` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `answer_hi` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `question_bn` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `question_hi` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FAQ` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "answer_bn",
DROP COLUMN "answer_hi",
DROP COLUMN "createdAt",
DROP COLUMN "question_bn",
DROP COLUMN "question_hi",
DROP COLUMN "updatedAt",
ADD COLUMN     "answerBn" TEXT,
ADD COLUMN     "answerHi" TEXT,
ADD COLUMN     "questionBn" TEXT,
ADD COLUMN     "questionHi" TEXT;
