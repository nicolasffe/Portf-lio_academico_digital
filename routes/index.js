import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const dados = {
    titulo: "Nícolas Fernandes | Portfólio", 
    paginaAtiva: "inicio", 
    nome: "Nícolas Ferreira Fernandes",
    curso: "Análise e Desenvolvimento de Sistemas - Fatec",
    descricao: "Estudante apaixonado por tecnologia e desenvolvimento de software, com foco em criar soluções criativas e funcionais.",
    linkedin: "https://www.linkedin.com/in/nicolas-ferreira-fernandes/",
    github: "https://github.com/nicolasffe"
  };

  res.render("index", dados);
});

export default router;