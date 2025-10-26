import express from "express";
const router = express.Router();

let certificados = [
  { id: 1, nome: "Introdução à Programação", emissor: "Alura", ano: "2024" },
];

// [GET]
router.get("/", (req, res) => {
  res.render("certificados", { titulo: "Certificados", certificados });
});

// [POST]
router.post("/", (req, res) => {
  const { nome, emissor, ano } = req.body;
  if (!nome || !emissor || !ano) return res.status(400).json({ erro: "Campos obrigatórios" });

  const novo = { id: certificados.length ? certificados[certificados.length - 1].id + 1 : 1, nome, emissor, ano };
  certificados.push(novo);
  res.status(201).json(novo);
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const cert = certificados.find(c => c.id === parseInt(id));
  if (!cert) return res.status(404).json({ erro: "Certificado não encontrado" });

  const { nome, emissor, ano } = req.body;
  if (nome) cert.nome = nome;
  if (emissor) cert.emissor = emissor;
  if (ano) cert.ano = ano;
  res.json(cert);
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = certificados.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Certificado não encontrado" });

  const removido = certificados.splice(index, 1);
  res.json({ mensagem: "Certificado removido com sucesso", removido });
});

export default router;