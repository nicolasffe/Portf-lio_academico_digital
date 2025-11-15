# Configuração do MySQL para o Portfólio Acadêmico

Este documento fornece instruções detalhadas sobre como configurar o MySQL para o projeto.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o MySQL instalado em seu sistema:

### Windows
Baixe e instale o MySQL Community Server de: https://dev.mysql.com/downloads/mysql/

### macOS
```bash
brew install mysql
brew services start mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

## 🔧 Configuração Inicial do MySQL

### 1. Acessar o MySQL

```bash
mysql -u root -p
```

### 2. Criar o Banco de Dados

```sql
CREATE DATABASE portfolio_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Criar um Usuário (Opcional, mas recomendado)

Para maior segurança, crie um usuário específico para a aplicação:

```sql
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'sua_senha_segura';
GRANT ALL PRIVILEGES ON portfolio_academico.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Verificar a Criação

```sql
SHOW DATABASES;
USE portfolio_academico;
```

## 🔐 Configuração do Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Usando o usuário root
DATABASE_URL="mysql://root:sua_senha@localhost:3306/portfolio_academico"

# OU usando o usuário específico (recomendado)
DATABASE_URL="mysql://portfolio_user:sua_senha_segura@localhost:3306/portfolio_academico"
```

### Formato da URL de Conexão

```
DATABASE_URL="mysql://[usuario]:[senha]@[host]:[porta]/[banco]?[opcoes]"
```

**Componentes:**
- **usuario**: Nome de usuário do MySQL
- **senha**: Senha do usuário
- **host**: Endereço do servidor (localhost para desenvolvimento local)
- **porta**: Porta do MySQL (padrão: 3306)
- **banco**: Nome do banco de dados
- **opcoes** (opcional): Parâmetros adicionais

### Exemplos de URLs

```env
# Desenvolvimento local básico
DATABASE_URL="mysql://root:password@localhost:3306/portfolio_academico"

# Com opções de conexão
DATABASE_URL="mysql://root:password@localhost:3306/portfolio_academico?connection_limit=5&pool_timeout=10"

# Servidor remoto
DATABASE_URL="mysql://usuario:senha@192.168.1.100:3306/portfolio_academico"

# Com SSL habilitado
DATABASE_URL="mysql://usuario:senha@servidor.com:3306/portfolio_academico?sslmode=require"
```

## 🚀 Executando as Migrations

Após configurar o arquivo `.env`, execute:

```bash
# Gerar o Prisma Client
npx prisma generate

# Executar as migrations
npx prisma migrate dev

# Ou criar uma nova migration
npx prisma migrate dev --name nome_da_migration
```

## 🔍 Verificando a Instalação

### Ver as Tabelas Criadas

```bash
mysql -u root -p
```

```sql
USE portfolio_academico;
SHOW TABLES;
DESCRIBE Projeto;
```

### Usar o Prisma Studio

O Prisma Studio é uma interface gráfica para visualizar e editar dados:

```bash
npx prisma studio
```

Acesse: http://localhost:5555

## 🐛 Solução de Problemas

### Erro: "Access denied for user"

**Problema:** Credenciais incorretas ou usuário sem permissões.

**Solução:**
1. Verifique se o usuário e senha estão corretos no `.env`
2. Redefina a senha do usuário:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
   FLUSH PRIVILEGES;
   ```

### Erro: "Can't connect to MySQL server"

**Problema:** MySQL não está rodando ou não está acessível.

**Solução:**
- **Linux:** `sudo systemctl start mysql`
- **macOS:** `brew services start mysql`
- **Windows:** Iniciar o serviço MySQL no Painel de Controle > Serviços

### Erro: "Unknown database"

**Problema:** O banco de dados não existe.

**Solução:**
```sql
CREATE DATABASE portfolio_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Erro de Porta em Uso

**Problema:** A porta 3306 já está em uso.

**Solução:**
1. Verifique qual processo está usando a porta:
   ```bash
   # Linux/macOS
   sudo lsof -i :3306
   
   # Windows
   netstat -ano | findstr :3306
   ```
2. Mude a porta no MySQL ou use outra porta na URL de conexão

### Erro: "Too many connections"

**Problema:** Limite de conexões excedido.

**Solução:**
1. Adicione limite de conexão na URL:
   ```env
   DATABASE_URL="mysql://user:pass@localhost:3306/portfolio_academico?connection_limit=5"
   ```
2. Ou aumente o limite no MySQL:
   ```sql
   SET GLOBAL max_connections = 200;
   ```

## 📊 Backup e Restauração

### Fazer Backup

```bash
mysqldump -u root -p portfolio_academico > backup.sql
```

### Restaurar Backup

```bash
mysql -u root -p portfolio_academico < backup.sql
```

## 🔄 Migração de SQLite para MySQL

Se você está migrando de SQLite:

1. **Exporte os dados do SQLite:**
   ```bash
   sqlite3 dev.db .dump > sqlite_dump.sql
   ```

2. **Converta o dump para MySQL** (ajuste os tipos de dados se necessário)

3. **Importe no MySQL:**
   ```bash
   mysql -u root -p portfolio_academico < mysql_dump.sql
   ```

4. **Ou use ferramentas como:**
   - [sqlite3-to-mysql](https://github.com/techouse/sqlite3-to-mysql)
   - [pgLoader](https://pgloader.io/)

## 🔒 Segurança

### Recomendações:

1. **Nunca compartilhe o arquivo .env**
2. **Use senhas fortes** para usuários do banco
3. **Crie usuários específicos** para cada aplicação
4. **Limite permissões** ao mínimo necessário
5. **Use conexões SSL** em produção
6. **Configure firewall** para proteger a porta 3306

### Exemplo de Usuário com Permissões Limitadas:

```sql
CREATE USER 'portfolio_app'@'localhost' IDENTIFIED BY 'senha_forte_123!@#';
GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio_academico.* TO 'portfolio_app'@'localhost';
FLUSH PRIVILEGES;
```

## 📚 Recursos Adicionais

- [Documentação do MySQL](https://dev.mysql.com/doc/)
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Prisma com MySQL](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [MySQL Best Practices](https://dev.mysql.com/doc/mysql-secure-deployment-guide/8.0/en/)

## 💡 Dicas

1. **Desenvolvimento:** Use `prisma studio` para visualizar dados
2. **Teste migrations:** Use `prisma migrate dev` durante desenvolvimento
3. **Produção:** Use `prisma migrate deploy` para aplicar migrations
4. **Reset completo:** `prisma migrate reset` apaga todos os dados
5. **Ver SQL gerado:** Use `prisma migrate dev --create-only` para ver SQL sem aplicar
