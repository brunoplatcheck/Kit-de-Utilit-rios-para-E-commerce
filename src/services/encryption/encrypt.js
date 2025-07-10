import chalk from "chalk";
import crypto from "crypto";
import getPrompt from "../../utils/prompt-helper.js";

async function encryptText() {
  const schema = {
    properties: {
      text: {
        description: "Digite o texto a ser criptografado",
        required: true,
        message: "Texto não pode estar vazio",
      },
      algorithm: {
        description: "Escolha o algoritmo de hash (sha256, sha512, md5)",
        default: "sha256",
        pattern: /^(sha256|sha512|md5)$/,
        message: "Algoritmo inválido. Escolha entre sha256, sha512, ou md5.",
      },
      useSalt: {
        description: "Deseja usar um salt aleatório? (sim/não)",
        default: "não",
        pattern: /^(sim|não|nao)$/i,
        message: "Responda sim ou não",
      }
    },
  };

  const { text, algorithm, useSalt } = await getPrompt(schema);

  let inputText = text;
  let salt = "";

  if (useSalt.toLowerCase().startsWith("s")) {
    salt = crypto.randomBytes(8).toString("hex");
    inputText = salt + text;
  }

  const hash = crypto.createHash(algorithm).update(inputText).digest("hex");

  console.log(chalk.green("\n🔐 Hash gerado com sucesso:\n"));
  if (salt) {
    console.log(chalk.cyan(`Salt usado: ${salt}`));
  }
  console.log(chalk.yellow(`${algorithm.toUpperCase()}:`));
  console.log(hash, "\n");
}

export default encryptText;
