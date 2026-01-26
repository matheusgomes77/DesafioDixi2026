⏱️ Projeto Matheus – Sistema de Registro de Ponto
Sistema web para registro de ponto com captura opcional de foto, desenvolvido em React (Frontend) e Java Spring Boot (Backend).

🎤 1️⃣ Explicação Geral
“Desenvolvi um sistema de registro de ponto com React no frontend e Spring Boot no backend.
O sistema captura data, hora e opcionalmente foto, com validações de negócio no backend e feedback visual no frontend.”

🎤 2️⃣ Regras de Negócio Implementadas
“Implementei a regra de impedir registros consecutivos em menos de 1 minuto.
Quando isso acontece, o backend marca o ponto como inválido (desconsiderado).
Também tratei ausência de foto e erro de câmera.”

🎤 3️⃣ Validações de Cenários de Borda
“Tratei cenários como backend offline, câmera sem permissão, tentativa consecutiva de registro e registro sem foto.
O frontend mostra mensagens apropriadas para o usuário.”

🎤 4️⃣ Arquitetura
“Separei frontend e backend, usando Controller, Service e Repository no backend seguindo boas práticas.
No frontend usei componentes reutilizáveis como Home e Modal.”

🎤 5️⃣ O que NÃO fiz (mas expliquei bem)
“O histórico de pontos e persistência em MySQL ficaram planejados para próxima etapa, pois o foco do desafio era validação de marcação e fluxo principal.”

🎤 6️⃣ Diferencial (IMPORTANTE FALAR)
“O modal funciona como confirmação visual do ponto, mostrando data, hora e foto antes de registrar, melhorando a experiência do usuário.”

📁 Estrutura do Projeto
DesafioDixi2026/
│
├── backend/   # API Java Spring Boot
└── frontend/  # Aplicação React
🚀 Como Rodar o Projeto
✅ 1️⃣ Pré-requisitos
Antes de começar, instale:

Node.js (versão 18 ou superior)

Java JDK 17+

Maven

Git

🖥️ FRONTEND (React)
📌 Entrar na pasta

cd frontend
📌 Instalar dependências
npm install

📌 Rodar o projeto
npm run dev

✅ Acessar no navegador
http://localhost:5173

☕ BACKEND (Spring Boot)
📌 Entrar na pasta
cd backend

📌 Rodar com Maven
mvn spring-boot:run

OU rodar pela IDE
Execute a classe:

PontoApplication.java

✅ Backend rodando em:
http://localhost:8080

🔗 Endpoints da API
✅ Registrar ponto

POST http://localhost:8080/pontos

Enviar foto (opcional):
Content-Type: multipart/form-data

Campo	Tipo	Descrição
foto	file	Foto capturada pela câmera

✅ Listar pontos
GET http://localhost:8080/pontos

# 📌 Como rodar o projeto localmente

# ▶️ Passo 1: Clonar o repositório
```bash
git clone https://github.com/matheus77/DesafioDixi2026.git

# Acesse a pasta
cd DesafioDixi2026

-------------------------------------------
✅ Observação:

O projeto segue arquitetura separada de frontend e backend, com validações de negócio no backend e controle de fluxo no frontend.
A persistência completa e histórico detalhado ficaram planejados para uma próxima etapa.

O frontend roda em http://localhost:5173 e consome a API Java rodando em http://localhost:8080/pontos.
