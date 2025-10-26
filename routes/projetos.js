import express from "express";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient(); 

// [GET]
router.get("/", async (req, res) => {
  try {
    const projetos = await prisma.projeto.findMany(); 
    res.render("projetos", { titulo: "Meus Projetos", projetos });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar projetos" });
  }
});

// [POST]
router.post("/", async (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome || !descricao) return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    await prisma.projeto.create({
      data: {
        nome: nome,
        descricao: descricao
      }
    });
    res.redirect('/projetos');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar projeto" });
  }
});

// [PUT]
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    await prisma.projeto.update({
      where: { id: parseInt(id) }, 
      data: {
        nome: nome,
        descricao: descricao
      }
    });
    res.redirect('/projetos');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar projeto" });
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.projeto.delete({
      where: { id: parseInt(id) } 
    });
    res.redirect('/projetos');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar projeto" });
  }
});

export default router;