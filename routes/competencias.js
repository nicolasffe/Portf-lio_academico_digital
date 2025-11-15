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
    console.error(error);
    req.flash('error', 'Erro ao buscar competências');
    res.redirect('/');
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
    req.flash('success', 'Competência adicionada com sucesso!');
    res.redirect('/competencias');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao adicionar competência');
    res.redirect('/competencias');
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
    req.flash('success', 'Competência atualizada com sucesso!');
    res.redirect('/competencias');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao atualizar competência');
    res.redirect('/competencias');
  }
});

// [DELETE] 
router.delete("/:id", async (req, res) => { 
  const { id } = req.params;
  try {
    await prisma.competencia.delete({
      where: { id: parseInt(id) }
    });
    req.flash('success', 'Competência removida com sucesso!');
    res.redirect('/competencias');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao deletar competência');
    res.redirect('/competencias');
  }
});

export default router;