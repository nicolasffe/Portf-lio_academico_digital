import express from "express";
import { PrismaClient } from '@prisma/client'; 

const router = express.Router();
const prisma = new PrismaClient();

// [GET]
router.get("/", async (req, res) => { 
  try {
    const certificados = await prisma.certificado.findMany();
    res.render("certificados", { 
      titulo: "Meus Certificados", 
      certificados,
      paginaAtiva: "certificados" 
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao buscar certificados');
    res.redirect('/');
  }
});

// [POST]
router.post("/", async (req, res) => { 
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
    req.flash('success', 'Certificado adicionado com sucesso!');
    res.redirect('/certificados');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao adicionar certificado');
    res.redirect('/certificados');
  }
});

// [PUT]
router.put("/:id", async (req, res) => { 
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
    req.flash('success', 'Certificado atualizado com sucesso!');
    res.redirect('/certificados');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao atualizar certificado');
    res.redirect('/certificados');
  }
});

// [DELETE]
router.delete("/:id", async (req, res) => { 
  const { id } = req.params;
  try {
    await prisma.certificado.delete({
      where: { id: parseInt(id) }
    });
    req.flash('success', 'Certificado removido com sucesso!');
    res.redirect('/certificados');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao deletar certificado');
    res.redirect('/certificados');
  }
});

export default router;