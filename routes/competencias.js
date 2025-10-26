import express from "express";
const router = express.Router();

let competencias = [
  { id: 1, nome: "Java", tipo: "Técnica" },
  { id: 2, nome: "Trabalho em equipe", tipo: "Interpessoal" },
];

// [GET]
router.get("/", (req, res) => {
  res.render("competencias", { titulo: "Competências", competencias });
});

// [POST]
router.post("/", (req, res) => {
  const { nome, tipo } = req.body;
  if (!nome || !tipo) return res.status(400).json({ erro: "Campos obrigatórios" });

  const nova = { id: competencias.length ? competencias[competencias.length - 1].id + 1 : 1, nome, tipo };
  competencias.push(nova);
  res.status(201).json(nova);
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const comp = competencias.find(c => c.id === parseInt(id));
  if (!comp) return res.status(404).json({ erro: "Competência não encontrada" });

  const { nome, tipo } = req.body;
  if (nome) comp.nome = nome;
  if (tipo) comp.tipo = tipo;
  res.json(comp);
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = competencias.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Competência não encontrada" });

  const removida = competencias.splice(index, 1);
  res.json({ mensagem: "Competência removida com sucesso", removida });
});

export default router;