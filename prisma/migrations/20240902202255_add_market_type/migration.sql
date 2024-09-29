/*
  Warnings:

  - Added the required column `type_market` to the `Profits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profits` ADD COLUMN `type_market` VARCHAR(191) NOT NULL;
