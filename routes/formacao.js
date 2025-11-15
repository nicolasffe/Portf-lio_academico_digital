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
    console.error(error);
    req.flash('error', 'Erro ao buscar formações');
    res.redirect('/');
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
    req.flash('success', 'Formação adicionada com sucesso!');
    res.redirect('/formacao');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao adicionar formação');
    res.redirect('/formacao');
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
    req.flash('success', 'Formação atualizada com sucesso!');
    res.redirect('/formacao');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao atualizar formação');
    res.redirect('/formacao');
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => { 
  const { id } = req.params;
  try {
    await prisma.formacao.delete({
      where: { id: parseInt(id) }
    });
    req.flash('success', 'Formação removida com sucesso!');
    res.redirect('/formacao');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao deletar formação');
    res.redirect('/formacao');
  }
});

export default router;