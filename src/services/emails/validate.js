// services/emails/validate.js
import fs from "fs";
import chalk from "chalk";
import validator from "validator";
import { format } from "date-fns";
import getPrompt from "../../utils/prompt-helper.js";

async function validateEmails() {
  try {
    const schema = {
      properties: {
        filePath: {
          description: "Digite o caminho do arquivo .txt com os e-mails (um por linha)",
          default: "emails.txt",
          required: true,
          conform: (value) => value.endsWith(".txt"),
          message: "O arquivo deve ser um .txt",
        },
      },
    };

    const { filePath } = await getPrompt(schema);

    if (!fs.existsSync(filePath)) {
      console.log(chalk.red("\n❌ Arquivo não encontrado!\n"));
      return;
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const emails = data.split(/\r?\n/).map((email) => email.trim()).filter(Boolean);

    if (emails.length === 0) {
      console.log(chalk.yellow("\n⚠️ O arquivo está vazio ou não contém e-mails válidos.\n"));
      return;
    }

    const validEmails = [];
    const invalidEmails = [];

    for (const email of emails) {
      if (validator.isEmail(email)) {
        validEmails.push(email);
      } else {
        invalidEmails.push(email);
      }
    }

    const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
    const validFile = `emails_validos_${timestamp}.txt`;
    const invalidFile = `emails_invalidos_${timestamp}.txt`;

    fs.writeFileSync(validFile, validEmails.join("\n"));
    fs.writeFileSync(invalidFile, invalidEmails.join("\n"));

    console.log(chalk.green("\n✅ Validação concluída."));
    console.log(chalk.blue(`✔️ Válidos: ${validEmails.length} | ❌ Inválidos: ${invalidEmails.length}`));
    console.log(chalk.blue(`📄 Arquivos salvos em: ${validFile} e ${invalidFile}\n`));

  } catch (error) {
    console.error(chalk.red("Erro ao validar e-mails:"), error.message);
  }
}

export default validateEmails;
