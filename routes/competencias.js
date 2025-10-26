import express from "express";
import { PrismaClient } from '@prisma/client'; // <-- Importar o Prisma

const router = express.Router();
const prisma = new PrismaClient(); // <-- Instanciar o Prisma

// [GET]
router.get("/", async (req, res) => { // <-- Adicionar async
  try {
    const competencias = await prisma.competencia.findMany();
    res.render("competencias", { titulo: "Competências", competencias });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar competências" });
  }
});

// [POST]
router.post("/", async (req, res) => { // <-- Adicionar async
  const { habilidade, descricao } = req.body; 
  if (!habilidade || !descricao) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  try {
    await prisma.competencia.create({
      data: {
        habilidade: habilidade,
        descricao: descricao
      }
    });
    res.redirect('/competencias');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar competência" });
  }
});

// [PUT]
router.put("/:id", async (req, res) => { // <-- Adicionar async
  const { id } = req.params;
  const { habilidade, descricao } = req.body; 

  try {
    await prisma.competencia.update({
      where: { id: parseInt(id) },
      data: {
        habilidade: habilidade,
        descricao: descricao
      }
    });
    res.redirect('/competencias');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar competência" });
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => { // <-- Adicionar async
  const { id } = req.params;
  try {
    await prisma.competencia.delete({
      where: { id: parseInt(id) }
    });
    res.redirect('/competencias');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar competência" });
  }
});

export default router;