
<div align="center">
<h1 align="center">Kit de Utilitários para E-commerce</h1>
</div>


## 💻 Sobre o Projeto

Este é um kit de utilitários desenvolvido em Node.js para facilitar operações comuns em e-commerce, e combina diversas funcionalidades num só terminal:

- 📷 Geração de QR Code
- 🔐 Geração de senhas seguras
- 📄 Criação e leitura de arquivos de texto
- ✅ Validação de listas de e-mails
- 🧾 Criação de faturas
- 📦 Simulação de frete
- 🏷️ Geração de etiquetas
- ⏱️ Agendamento de backups com cron

Ideal para quem quer criar scripts práticos e eficientes.

---

## ⚙️ Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
 Node.js (ES Modules)
- `prompt` para input no terminal
- `qrcode` para geração de códigos QR
- `crypto` para hashing e criptografia
- `node-cron` para automação
- `pdfkit` para gerar PDFs
- `validator` para validação de e-mails
- `date-fns` para formatação de datas
- `chalk` para colorir o terminal

---

## 📦 Instalação

Clone o repositório e rode:

```bash
git clone https://github.com/brunoplatcheck/Kit-de-Utilit-rios-para-E-commerce.git
cd Kit-de-Utilit-rios-para-E-commerce
npm install
```

Crie o arquivo `.env` (caso queira usar variáveis de ambiente para a geração de senhas etc.):

```env
UPPERCASE_LETTERS=true
LOWERCASE_LETTERS=true
NUMBERS=true
SPECIAL_CHARACTERS=true
```

---

## 🚀 Como usar

Inicie o projeto:

```bash
npm run start
```

No menu, selecione a opção desejada. A navegação é feita pelo terminal e as instruções são exibidas na tela.

---

## 🧰 Funcionalidades

- 🎟️ **Gerar QR Code** – digite o texto/link e receba um QR Code em imagem
- 🔐 **Gerar Senhas Seguras** – com prefácio de caracteres conforme `.env`
- 🎫 **Gerar Cupons** – crie cupons com prefixo e quantidades variadas
- ✉️ **Validar E-mails** – verifica listas e agrupa e-mails válidos e inválidos
- 🧾 **Gerar Fatura** – crie faturas com múltiplos itens e salve em arquivo
- 📦 **Simular Frete** – cálculo simples baseado em CEP e peso
- 🏷️ **Gerar Etiqueta** – cria texto + PDF de etiqueta de envio
- ⏱️ **Agendador de Backup** – salva arquivos automaticamente a cada minuto

---

## 📁 Estrutura do Projeto

```
src/
├── index.js                  # Ponto de entrada (menu principal)
├── services/                 # Funcionalidades por serviço
│   ├── qrcode/
│   ├── password/
│   ├── coupons/
│   ├── emails/
│   ├── invoice/
│   ├── shipping/
│   ├── labels/
│   └── scheduler/
├── prompts-schema/           # Schemas de prompts por serviço
└── utils/                    # Helpers (prompt, filtragem de caracteres...)
```

---

## ✅ Aprendizados

- Modularização de código em serviços
- Criação de utilitários de linha de comando
- Manipulação de arquivos (txt, pdf, imagens)
- Uso de cron para automação
- Implementação de hashing, validação de dados e geração de etiquetas

---

## 👨‍🏫 Créditos

Projeto inspirado na formação da DIO (Digital Innovation One) e complementado com novas funcionalidades:

- Autor: [Bruno Platcheck](https://github.com/brunoplatcheck)
- Instrutor: [@felipeAguiarCode](https://github.com/felipeAguiarCode)
- Plataforma: [DIO](https://www.dio.me/)

---
