import express from "express";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient(); 

// [GET]
router.get("/", async (req, res) => { 
  try {
    const formacoes = await prisma.formacao.findMany();
    res.render("formacao", { 
      titulo: "Formação Acadêmica", 
      formacoes,
      paginaAtiva: "formacao" // Para o menu
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar formações" });
  }
});

// [POST]
router.post("/", async (req, res) => { 
  const { curso, instituicao, periodo } = req.body; 
  if (!curso || !instituicao || !periodo) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  try {
    await prisma.formacao.create({
      data: {
        curso: curso,
        instituicao: instituicao,
        periodo: periodo
      }
    });
    res.redirect('/formacao');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar formação" });
  }
});

// [PUT]
router.put("/:id", async (req, res) => { 
  const { id } = req.params;
  const { curso, instituicao, periodo } = req.body;

  try {
    await prisma.formacao.update({
      where: { id: parseInt(id) },
      data: {
        curso: curso,
        instituicao: instituicao,
        periodo: periodo
      }
    });
    res.redirect('/formacao');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar formação" });
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => { 
  const { id } = req.params;
  try {
    await prisma.formacao.delete({
      where: { id: parseInt(id) }
    });
    res.redirect('/formacao');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar formação" });
  }
});

export default router;