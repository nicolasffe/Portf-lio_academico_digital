import express from "express";
const router = express.Router();

let formacoes = [
  { id: 1, curso: "Análise e Desenvolvimento de Sistemas", instituicao: "Fatec", anoConclusao: "2026" },
];

// [GET]
router.get("/", (req, res) => {
  res.render("formacao", { titulo: "Formação Acadêmica", formacoes });
});

// [POST]
router.post("/", (req, res) => {
  const { curso, instituicao, anoConclusao } = req.body;
  if (!curso || !instituicao || !anoConclusao) return res.status(400).json({ erro: "Campos obrigatórios" });

  const nova = {
    id: formacoes.length ? formacoes[formacoes.length - 1].id + 1 : 1,
    curso,
    instituicao,
    anoConclusao
  };
  formacoes.push(nova);
  res.status(201).json(nova);
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const formacao = formacoes.find(f => f.id === parseInt(id));
  if (!formacao) return res.status(404).json({ erro: "Formação não encontrada" });

  const { curso, instituicao, anoConclusao } = req.body;
  if (curso) formacao.curso = curso;
  if (instituicao) formacao.instituicao = instituicao;
  if (anoConclusao) formacao.anoConclusao = anoConclusao;
  res.json(formacao);
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = formacoes.findIndex(f => f.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Formação não encontrada" });

  const removida = formacoes.splice(index, 1);
  res.json({ mensagem: "Formação removida com sucesso", removida });
});

export default router;