import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Running seed...');

  await prisma.projeto.createMany({
    data: [
      {
        nome: 'Site Pessoal',
        descricao: 'Portfólio pessoal desenvolvido com Node.js, Express e Prisma.',
        linkRepositorio: 'https://github.com/nicolasffe/portfolio'
      },
      {
        nome: 'API de Exemplo',
        descricao: 'Uma API simples usando Express e Prisma.',
        linkRepositorio: ''
      }
    ],
    skipDuplicates: true
  });

  await prisma.formacao.createMany({
    data: [
      { curso: 'Análise e Desenvolvimento de Sistemas', instituicao: 'Fatec', periodo: '2023 - 2026' }
    ],
    skipDuplicates: true
  });

  await prisma.competencia.createMany({
    data: [
      { habilidade: 'JavaScript', nivel: 'Avançado' },
      { habilidade: 'Node.js', nivel: 'Intermediário' },
      { habilidade: 'SQL', nivel: 'Intermediário' }
    ],
    skipDuplicates: true
  });

  await prisma.certificado.createMany({
    data: [
      { titulo: 'Curso Node.js', emissor: 'Plataforma X', ano: '2024' }
    ],
    skipDuplicates: true
  });

  console.log('Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
