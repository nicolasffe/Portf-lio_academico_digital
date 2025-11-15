import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override'; 
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';

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

// Load .env if exists
dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session + Flash
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 hours
}));
app.use(flash());

// Expose flash messages to views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

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