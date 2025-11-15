import express from "express";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// [GET]
router.get("/", async (req, res) => {
  try {
    const projetos = await prisma.projeto.findMany();
    res.render("projetos", {
      titulo: "Meus Projetos",
      projetos,
      paginaAtiva: "projetos"
    });
  } catch (error) {
    console.error("Erro ao buscar projetos:", error); 
    req.flash('error', 'Erro ao buscar projetos');
    res.redirect('/');
  }
});

// [POST]
router.post("/", async (req, res) => {
  const { nome, descricao, linkRepositorio } = req.body;
  if (!nome || !descricao) return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    await prisma.projeto.create({
      data: {
        nome: nome,
        descricao: descricao,
        linkRepositorio: linkRepositorio || null
      }
    });
    req.flash('success', 'Projeto adicionado com sucesso!');
    res.redirect('/projetos');
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    req.flash('error', 'Erro ao adicionar projeto');
    res.redirect('/projetos');
  }
});

// [PUT]
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, linkRepositorio } = req.body;

  try {
    await prisma.projeto.update({
      where: { id: parseInt(id) },
      data: {
        nome: nome,
        descricao: descricao,
        linkRepositorio: linkRepositorio || null
      }
    });
    req.flash('success', 'Projeto atualizado com sucesso!');
    res.redirect('/projetos');
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error); 
    req.flash('error', 'Erro ao atualizar projeto');
    res.redirect('/projetos');
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.projeto.delete({
      where: { id: parseInt(id) }
    });
    req.flash('success', 'Projeto removido com sucesso!');
    res.redirect('/projetos');
  } catch (error) {
    console.error("Erro ao deletar projeto:", error); 
    req.flash('error', 'Erro ao deletar projeto');
    res.redirect('/projetos');
  }
});


export default router;