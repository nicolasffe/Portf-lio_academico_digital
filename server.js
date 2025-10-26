import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override'; 

// Importa rotas
import indexRoutes from "./routes/index.js";
import projetosRoutes from "./routes/projetos.js";
import formacaoRoutes from "./routes/formacao.js";
import competenciasRoutes from "./routes/competencias.js";
import certificadosRoutes from "./routes/certificados.js";

const app = express();

// Configurações básicas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 

// Rotas
app.use("/", indexRoutes);
app.use("/projetos", projetosRoutes);
app.use("/formacao", formacaoRoutes);
app.use("/competencias", competenciasRoutes);
app.use("/certificados", certificadosRoutes);

// Servidor
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);