import express from "express";
import { PrismaClient } from '@prisma/client'; 

const router = express.Router();
const prisma = new PrismaClient(); 

// [GET]
router.get("/", async (req, res) => { 
  try {
    const competencias = await prisma.competencia.findMany();
    res.render("competencias", { 
      titulo: "Minhas Competências", 
      competencias,
      paginaAtiva: "competencias" 
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar competências" });
  }
});

// [POST]
router.post("/", async (req, res) => { 
  const { habilidade, nivel } = req.body; 
  if (!habilidade || !nivel) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  try {
    await prisma.competencia.create({
      data: {
        habilidade: habilidade,
        nivel: nivel 
      }
    });
    res.redirect('/competencias');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar competência" });
  }
});

// [PUT]
router.put("/:id", async (req, res) => { 
  const { id } = req.params;
  const { habilidade, nivel } = req.body; 

  try {
    await prisma.competencia.update({
      where: { id: parseInt(id) },
      data: {
        habilidade: habilidade,
        nivel: nivel 
      }
    });
    res.redirect('/competencias');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar competência" });
  }
});

// [DELETE] 
router.delete("/:id", async (req, res) => { 
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