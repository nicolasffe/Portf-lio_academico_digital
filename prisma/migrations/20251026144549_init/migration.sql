-- CreateTable
CREATE TABLE "Projeto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Formacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "curso" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "periodo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Competencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habilidade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "emissor" TEXT NOT NULL,
    "ano" TEXT NOT NULL
);
