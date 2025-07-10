import chalk from "chalk";
import getPrompt from "../../utils/prompt-helper.js";

function calcularFrete(cep, peso) {
  let base = 10; // valor base do frete

  // Ajuste por região (exemplos simples)
  if (/^9\d{7}$/.test(cep)) {
    base += 5; // região Norte/Nordeste
  } else if (/^1\d{7}$/.test(cep)) {
    base += 3; // região Sudeste
  }

  // Adiciona valor extra por peso acima de 1kg
  if (peso > 1) {
    base += (peso - 1) * 2;
  }

  return base;
}

async function simulateShipping() {
  const schema = {
    properties: {
      cep: {
        description: "Digite o CEP de destino (somente números, 8 dígitos)",
        pattern: /^\d{8}$/,
        message: "Por favor, digite um CEP válido com 8 dígitos numéricos.",
        required: true,
      },
      peso: {
        description: "Digite o peso do pacote em KG (ex: 1.5)",
        type: "number",
        default: 1,
        conform: (val) => val > 0,
        message: "O peso deve ser um número maior que zero.",
        required: true,
      },
    },
  };

  const { cep, peso } = await getPrompt(schema);

  const frete = calcularFrete(cep, peso);

  console.log(chalk.green(`\n📦 Frete estimado para CEP ${cep}: R$ ${frete.toFixed(2)}\n`));
}

export default simulateShipping;
