import express from "express";
const router = express.Router();

let projetos = [
  { id: 1, nome: "DeepCode", descricao: "IA integrada à IDE em JavaFX" },
  { id: 2, nome: "Sistema de Alunos", descricao: "CRUD com MySQL e JavaFX" },
];

// [GET]
router.get("/", (req, res) => {
  res.render("projetos", { titulo: "Meus Projetos", projetos });
});

// [POST]
router.post("/", (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome || !descricao) return res.status(400).json({ erro: "Campos obrigatórios" });

  const novo = { id: projetos.length ? projetos[projetos.length - 1].id + 1 : 1, nome, descricao };
  projetos.push(novo);
  res.status(201).json(novo);
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const projeto = projetos.find(p => p.id === parseInt(id));
  if (!projeto) return res.status(404).json({ erro: "Projeto não encontrado" });

  const { nome, descricao } = req.body;
  if (nome) projeto.nome = nome;
  if (descricao) projeto.descricao = descricao;
  res.json(projeto);
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = projetos.findIndex(p => p.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Projeto não encontrado" });

  const removido = projetos.splice(index, 1);
  res.json({ mensagem: "Projeto removido com sucesso", removido });
});

export default router;