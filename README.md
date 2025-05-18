# 🧠 Useless Meeting Analyzer

Este projeto em **Node.js** (utilizando Azure Functions) tem como objetivo principal **avaliar o quão inúteis são as reuniões** nas quais você foi convidado. Com integração ao Google Calendar e OpenAI, ele analisa eventos e gera relatórios (ou desculpas) sobre sua real utilidade.

## 🚀 Funcionalidades

- 🔐 **Autenticação com Google**
  - `GET /google/auth/consent`: Inicia o fluxo OAuth2 para autenticação.
  - `GET /google/auth/callback`: Recebe o callback da autenticação.

- 📅 **Leitura de Eventos do Google Calendar**
  - `GET /google/events/read`: Lista todos os eventos do usuário.
  - `GET /google/event/read`: Lê detalhes de um evento específico.

- 🧾 **Geração de Transcrição com OpenAI**
  - `GET /openai/transcript/generate`: Gera uma transcrição baseada em um evento/reunião.

- 🧮 **Análise de Calendário**
  - `GET /calendar/analyze-all`: Analisa todos os eventos e calcula a utilidade de cada reunião.
  - `GET /calendar/read-events`: Lê todos os eventos do calendário.
  - `POST /calendar/event-transcript`: Analisa a transcrição de um evento e retorna um veredito sobre sua utilidade.
  - `GET /calendar/excuse-generator`: Gera uma desculpa plausível para evitar reuniões inúteis.

- 🧠 **Módulo de Treinamento**
  - `GET /training/generate`: Gera um prompt de treinamento baseado em eventos.
  - `POST /training/check`: Verifica se um prompt está adequado para treinar o modelo de análise.

## 📁 Estrutura do Projeto

Todo o código está contido em um único arquivo principal: `index.ts`. As rotas são definidas usando o framework `@azure/functions`, e os handlers são importados de módulos específicos:

- `./google` → autenticação e leitura de eventos
- `./openai` → geração de transcrição com IA
- `./calendar` → análise, leitura e desculpas
- `./training` → geração e verificação de prompts

## ✅ Pré-requisitos

- Node.js 18+
- Conta do Azure (para Azure Functions)
- Conta Google com permissão para acessar o calendário
- Chave de API da OpenAI

## 📦 Instalação

`npm install`

`npm start`


## Postman Público

[Postman Desabafa-Dev](https://www.postman.com/dark-satellite-650308/desabafa-dev/collection/2i6lfwu/rest-api-basics-crud-test-variable)