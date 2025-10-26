/*
  Warnings:

  - You are about to drop the column `descricao` on the `Competencia` table. All the data in the column will be lost.
  - Added the required column `nivel` to the `Competencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN "linkRepositorio" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habilidade" TEXT NOT NULL,
    "nivel" TEXT NOT NULL
);
INSERT INTO "new_Competencia" ("habilidade", "id") SELECT "habilidade", "id" FROM "Competencia";
DROP TABLE "Competencia";
ALTER TABLE "new_Competencia" RENAME TO "Competencia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
