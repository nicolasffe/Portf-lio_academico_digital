import express from "express";
const router = express.Router();

let certificados = [
  { id: 1, titulo: "Introdução à Programação", emissor: "Alura", ano: "2024" }, 
];

// [GET]
router.get("/", (req, res) => {
  res.render("certificados", { titulo: "Certificados", certificados });
});

// [POST]
router.post("/", (req, res) => {
  const { titulo, emissor, ano } = req.body; // <-- CORRIGIDO
  if (!titulo || !emissor || !ano) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  const novo = { id: certificados.length ? certificados[certificados.length - 1].id + 1 : 1, titulo, emissor, ano };
  certificados.push(novo);
  res.redirect('/certificados'); 
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const cert = certificados.find(c => c.id === parseInt(id));
  if (!cert) return res.status(404).json({ erro: "Certificado não encontrado" });

  const { titulo, emissor, ano } = req.body; 
  if (titulo) cert.titulo = titulo; 
  if (emissor) cert.emissor = emissor;
  if (ano) cert.ano = ano;
  res.redirect('/certificados'); 
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = certificados.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Certificado não encontrado" });

  const removido = certificados.splice(index, 1);
  res.redirect('/certificados'); 
});

export default router;