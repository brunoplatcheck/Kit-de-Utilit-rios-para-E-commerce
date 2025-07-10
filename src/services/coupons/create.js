// services/coupons/create.js
import fs from "fs";
import { nanoid } from "nanoid";
import chalk from "chalk";
import { format } from "date-fns";
import prompt from "prompt";

function getPrompt(schema) {
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function createCoupons() {
  try {
    prompt.start();

    const schema = {
      properties: {
        prefix: {
          description: "Prefixo dos cupons (ex: PROMO)",
          default: "PROMO",
          required: true,
          type: "string",
        },
        quantity: {
          description: "Quantidade de cupons",
          required: true,
          type: "integer",
          default: 10,
          conform: (val) => val > 0,
          message: "A quantidade deve ser maior que 0",
          before: (val) => parseInt(val, 10),
        },
        length: {
          description: "Tamanho do código aleatório (após prefixo)",
          required: true,
          type: "integer",
          default: 6,
          conform: (val) => val >= 4,
          message: "Deve ter no mínimo 4 caracteres aleatórios",
          before: (val) => parseInt(val, 10),
        },
      },
    };

    const { prefix, quantity, length } = await getPrompt(schema);

    const coupons = [];
    for (let i = 0; i < quantity; i++) {
      const code = `${prefix}${nanoid(length).toUpperCase()}`;
      coupons.push(code);
    }

    const fileName = `cupons_${format(new Date(), "yyyyMMdd_HHmmss")}.txt`;

    fs.writeFileSync(fileName, coupons.join("\n"));

    console.log(chalk.green(`\n✅ ${quantity} cupons gerados com sucesso!`));

    // Mostrar cupons (se quantidade for muito alta, limitar)
    const maxToShow = 20;
    if (quantity <= maxToShow) {
      coupons.forEach((c) => console.log(" -", c));
    } else {
      console.log(chalk.yellow(`Mostrando os primeiros ${maxToShow} cupons:`));
      coupons.slice(0, maxToShow).forEach((c) => console.log(" -", c));
      console.log(chalk.gray(`... e mais ${quantity - maxToShow} cupons.`));
    }

    console.log(chalk.blue(`\n📁 Cupons salvos em: ${fileName}\n`));
  } catch (error) {
    console.error(chalk.red("Erro ao gerar cupons:"), error.message);
  }
}

export default createCoupons;
