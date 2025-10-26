import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const dados = {
    nome: "Nícolas Ferreira Fernandes",
    curso: "Análise e Desenvolvimento de Sistemas - Fatec",
    descricao: "Estudante apaixonado por tecnologia e desenvolvimento de software, com foco em criar soluções criativas e funcionais."
  };

  res.render("index", dados);
});

export default router;
