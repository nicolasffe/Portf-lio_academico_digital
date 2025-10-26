import express from "express";
const router = express.Router();

let competencias = [
  { id: 1, habilidade: "Java", descricao: "Técnica" }, 
  { id: 2, habilidade: "Trabalho em equipe", descricao: "Interpessoal" }, 
];

// [GET]
router.get("/", (req, res) => {
  res.render("competencias", { titulo: "Competências", competencias });
});

// [POST]
router.post("/", (req, res) => {
  const { habilidade, descricao } = req.body; 
  if (!habilidade || !descricao) return res.status(400).json({ erro: "Campos obrigatórios" }); 

  const nova = { id: competencias.length ? competencias[competencias.length - 1].id + 1 : 1, habilidade, descricao }; 
  competencias.push(nova);
  res.redirect('/competencias'); 
});

// [PUT]
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const comp = competencias.find(c => c.id === parseInt(id));
  if (!comp) return res.status(404).json({ erro: "Competência não encontrada" });

  const { habilidade, descricao } = req.body; 
  if (habilidade) comp.habilidade = habilidade; 
  if (descricao) comp.descricao = descricao; 
  res.redirect('/competencias'); 
});

// [DELETE]
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = competencias.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ erro: "Competência não encontrada" });

  const removida = competencias.splice(index, 1);
  res.redirect('/competencias'); 
});

export default router;