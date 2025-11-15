# Portfólio Acadêmico Digital

## 📝 Descrição do Projeto

Este projeto é um Portfólio Acadêmico Digital desenvolvido como uma aplicação web full-stack. Ele serve como uma ferramenta para apresentar a trajetória educacional, competências técnicas, projetos desenvolvidos e certificações de um estudante ou profissional.

O portfólio permite cadastrar, visualizar, editar e excluir informações nas seguintes seções:
* Formação Acadêmica
* Projetos Desenvolvidos
* Competências (com nível de proficiência)
* Certificados

## ✨ Funcionalidades Principais

* **Página de Apresentação:** Exibe informações básicas, descrição e links para redes sociais (GitHub, LinkedIn).
* **Gerenciamento CRUD Completo:** Interface web para Create, Read, Update, Delete (CRUD) para todas as seções (Formação, Projetos, Competências, Certificados).
* **Visualização Agradável:** Design responsivo com tema escuro e detalhes em dourado, utilizando CSS Grid para organizar os cards.
* **Representação Visual de Nível:** Competências são exibidas com um sistema de estrelas para indicar o nível de proficiência.
* **Links para Repositórios:** Projetos podem incluir um link opcional para seus repositórios.
* **Persistência de Dados:** As informações são salvas permanentemente em um banco de dados MySQL gerenciado pelo Prisma ORM.

## 🛠️ Tecnologias Utilizadas

* **Backend:**
    * **Node.js:** Ambiente de execução JavaScript no servidor.
    * **Express:** Framework web para Node.js, usado para criar as rotas e a estrutura da API.
    * **Prisma:** ORM (Object-Relational Mapper) para interagir com o banco de dados de forma segura e eficiente.
    * **MySQL:** Banco de dados relacional robusto, usado para armazenar os dados do portfólio.
* **Frontend:**
    * **EJS (Embedded JavaScript templates):** Engine de template para renderizar HTML dinamicamente no servidor.
    * **HTML5:** Estrutura das páginas web.
    * **CSS3:** Estilização visual, incluindo Flexbox, Grid Layout e Variáveis CSS para o tema.
    * **Font Awesome:** Biblioteca de ícones utilizada na interface [referenciado no passo 1.1 anterior].
* **Ferramentas:**
    * **Nodemon:** Monitora alterações nos arquivos e reinicia o servidor automaticamente durante o desenvolvimento.
    * **method-override:** Middleware para permitir o uso dos verbos HTTP PUT e DELETE diretamente de formulários HTML.
    * **dotenv:** Carrega variáveis de ambiente (como a URL do banco de dados) a partir de um arquivo `.env`.

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina:

**Pré-requisitos:**
* Node.js (versão 18.18 ou superior recomendada, devido ao Prisma)
* npm (geralmente vem com o Node.js)
* MySQL Server (versão 5.7 ou superior)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```
    *(Substitua `seu-usuario/seu-repositorio` pelo caminho real do seu projeto no GitHub)*

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados MySQL:**
    
    a. **Crie um banco de dados MySQL:**
    ```sql
    CREATE DATABASE portfolio_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```
    
    b. **Configure a variável de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (você pode copiar do `.env.example`):
    ```bash
    cp .env.example .env
    ```
    
    Edite o arquivo `.env` e configure a URL de conexão do MySQL:
    ```
    DATABASE_URL="mysql://usuario:senha@localhost:3306/portfolio_academico"
    ```
    
    Substitua `usuario`, `senha` e `portfolio_academico` pelas suas credenciais e nome do banco.
    
    c. **Execute as migrations do Prisma:**
    ```bash
    npx prisma migrate dev
    ```
    
    Este comando irá:
    - Aplicar as migrations ao banco de dados MySQL
    - Gerar o Prisma Client atualizado

4.  **Inicie o servidor de desenvolvimento:**
    Existem duas formas:
    * **Usando o script `dev` (recomendado):**
        ```bash
        npm run dev
        ```
        *(Certifique-se de ter adicionado `"dev": "nodemon server.js"` na seção `scripts` do seu `package.json`)*
    * **Usando `npx` diretamente:**
        ```bash
        npx nodemon server.js
        ```

5.  **Acesse a aplicação:**
    Abra seu navegador e vá para `http://localhost:5000`.

## 🔄 Migrando de SQLite para MySQL

Se você estava usando SQLite anteriormente e deseja migrar para MySQL, siga estes passos:

1. **Exporte seus dados do SQLite** (se você tiver dados importantes que deseja preservar)
2. **Crie o banco de dados MySQL** conforme descrito na seção "Como Rodar o Projeto"
3. **Configure o arquivo `.env`** com a URL de conexão do MySQL
4. **Execute as migrations**:
   ```bash
   npx prisma migrate dev
   ```
5. **Reimporte seus dados** no novo banco MySQL (se necessário)

## 🛠️ Comandos Úteis do Prisma

* **Ver o banco de dados no navegador:**
  ```bash
  npx prisma studio
  ```
  
* **Gerar o Prisma Client após alterações no schema:**
  ```bash
  npx prisma generate
  ```
  
* **Resetar o banco de dados (apaga todos os dados):**
  ```bash
  npx prisma migrate reset
  ```

## 📋 Configuração do MySQL

A URL de conexão do MySQL no arquivo `.env` segue o formato:
```
DATABASE_URL="mysql://usuario:senha@host:porta/nome_do_banco"
```

Exemplos:
* **Desenvolvimento local:** `mysql://root:senha123@localhost:3306/portfolio_academico`
* **Servidor remoto:** `mysql://usuario:senha@192.168.1.100:3306/portfolio_academico`
* **Com opções adicionais:** `mysql://usuario:senha@localhost:3306/portfolio_academico?connection_limit=5`
