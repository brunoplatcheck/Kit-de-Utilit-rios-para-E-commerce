// src/index.js (main.js)
import prompt from "prompt";
import chalk from "chalk";

import createQRCode from "./services/qr-code/create.js";
import createPassword from "./services/password/create.js";
import createCoupons from "./services/coupons/create.js";
import validateEmails from "./services/emails/validate.js";
import createInvoice from "./services/invoice/create.js";
import simulateShipping from "./services/shipping/simulate.js";
import createLabel from "./services/labels/create.js";
import encryptText from "./services/encryption/encrypt.js";
import startCron from "./services/scheduler/cron.js";

const promptSchemaMain = {
  properties: {
    option: {
      description: chalk.yellow(`
=== MENU PRINCIPAL ===

1 - Gerar QR Code
2 - Gerar Senha Segura
3 - Gerar Cupons de Desconto
4 - Validar Lista de E-mails
5 - Gerar Fatura
6 - Simular Frete
7 - Gerar Etiqueta de Envio
8 - Criptografar Texto
9 - Iniciar Agendador de Backups
0 - Sair

Digite a opção desejada:`),
      required: true,
      pattern: /^[0-9]$/,
      message: chalk.red("Erro: Digite um número entre 0 e 9."),
      conform: (value) => {
        const num = parseInt(value, 10);
        return num >= 0 && num <= 9;
      },
    },
  },
};

function getPrompt(schema) {
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) {
        if (err.message === "canceled") {
          console.log(chalk.cyan("\nOperação cancelada. Saindo..."));
          process.exit(0);
        }
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function main() {
  prompt.start();
  prompt.message = "";

  let running = true;

  while (running) {
    try {
      const { option } = await getPrompt(promptSchemaMain);

      switch (option) {
        case "1":
          await createQRCode();
          break;
        case "2":
          await createPassword();
          break;
        case "3":
          await createCoupons();
          break;
        case "4":
          await validateEmails();
          break;
        case "5":
          await createInvoice();
          break;
        case "6":
          await simulateShipping();
          break;
        case "7":
          await createLabel();
          break;
        case "8":
          await encryptText();
          break;
        case "9":
          startCron();
          break;
        case "0":
          running = false;
          console.log(chalk.cyan("Saindo..."));
          break;
        default:
          console.log(chalk.red("Opção inválida."));
      }

      if (running) {
        await getPrompt({
          properties: {
            continue: {
              description: chalk.gray("\nPressione ENTER para voltar ao menu..."),
            },
          },
        });
        console.clear();
      }
    } catch (error) {
      console.error(chalk.red("Ocorreu um erro:"), error);
      running = false;
    }
  }
}

main();
