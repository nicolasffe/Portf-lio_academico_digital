import express from "express";
import { PrismaClient } from '@prisma/client'; // <-- Importar o Prisma

const router = express.Router();
const prisma = new PrismaClient(); // <-- Instanciar o Prisma

// [GET]
router.get("/", async (req, res) => { // <-- Adicionar async
  try {
    const certificados = await prisma.certificado.findMany();
    res.render("certificados", { titulo: "Certificados", certificados });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar certificados" });
  }
});

// [POST]
router.post("/", async (req, res) => { // <-- Adicionar async
  const { titulo, emissor, ano } = req.body;
  if (!titulo || !emissor || !ano) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  try {
    await prisma.certificado.create({
      data: {
        titulo: titulo,
        emissor: emissor,
        ano: ano
      }
    });
    res.redirect('/certificados');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar certificado" });
  }
});

// [PUT]
router.put("/:id", async (req, res) => { // <-- Adicionar async
  const { id } = req.params;
  const { titulo, emissor, ano } = req.body; 

  try {
    await prisma.certificado.update({
      where: { id: parseInt(id) },
      data: {
        titulo: titulo,
        emissor: emissor,
        ano: ano
      }
    });
    res.redirect('/certificados');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar certificado" });
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => { // <-- Adicionar async
  const { id } = req.params;
  try {
    await prisma.certificado.delete({
      where: { id: parseInt(id) }
    });
    res.redirect('/certificados');
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar certificado" });
  }
});

export default router;