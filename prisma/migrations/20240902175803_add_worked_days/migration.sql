/*
  Warnings:

  - Added the required column `worked_days` to the `Profits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profits` ADD COLUMN `worked_days` DOUBLE NOT NULL;
