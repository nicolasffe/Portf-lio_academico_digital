import express from "express";
import { PrismaClient } from '@prisma/client'; // <-- 1. Importar o Prisma

const router = express.Router();
const prisma = new PrismaClient(); // <-- 2. Instanciar o Prisma

// [GET]
// Todas as rotas que acessam o banco precisam ser 'async'
router.get("/", async (req, res) => {
  try {
    // 3. Substituímos o array por uma busca no banco
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
    // 4. Substituímos o .push() por uma criação no banco
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
    // 5. Substituímos o .find() e a atribuição por um update no banco
    await prisma.projeto.update({
      where: { id: parseInt(id) }, // Encontra o projeto pelo ID
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
    // 6. Substituímos o .findIndex() e .splice() por um delete no banco
    await prisma.projeto.delete({
      where: { id: parseInt(id) } // Encontra o projeto pelo ID
    });
    res.redirect('/projetos');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar projeto" });
  }
});

export default router;