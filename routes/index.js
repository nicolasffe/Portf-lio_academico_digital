import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const dados = {
    titulo: "Nícolas Fernandes | Portfólio", // Título da página
    paginaAtiva: "inicio", // Para o menu de navegação
    nome: "Nícolas Ferreira Fernandes",
    curso: "Análise e Desenvolvimento de Sistemas - Fatec",
    descricao: "Estudante apaixonado por tecnologia e desenvolvimento de software, com foco em criar soluções criativas e funcionais.",
    // ADICIONE SEUS LINKS AQUI
    linkedin: "https://www.linkedin.com/in/seu-usuario",
    github: "https://github.com/nicolasffe"
  };

  res.render("index", dados);
});

export default router;