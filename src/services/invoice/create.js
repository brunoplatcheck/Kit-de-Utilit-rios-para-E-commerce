import chalk from "chalk";
import fs from "fs";
import { format } from "date-fns";
import getPrompt from "../../utils/prompt-helper.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

async function createInvoice() {
  try {
    const invoiceSchema = {
      properties: {
        customerName: {
          description: "Nome do cliente",
          required: true,
        },
        paymentMethod: {
          description: "Forma de pagamento (PIX, Cartão de Crédito, Boleto, Dinheiro)",
          default: "PIX",
          pattern: /^(PIX|Cartão de Crédito|Boleto|Dinheiro)$/i,
          message: "Escolha uma forma de pagamento válida.",
        },
        itemCount: {
          description: "Quantos produtos serão inseridos?",
          type: "integer",
          default: 1,
          conform: (n) => n > 0,
          message: "Deve haver ao menos um produto.",
        },
      },
    };

    const { customerName, paymentMethod, itemCount } = await getPrompt(invoiceSchema);

    const items = [];
    for (let i = 0; i < itemCount; i++) {
      const itemSchema = {
        properties: {
          itemName: {
            description: `Produto ${i + 1} - Nome`,
            required: true,
          },
          itemPrice: {
            description: `Produto ${i + 1} - Preço (R$)`,
            type: "number",
            required: true,
            conform: (val) => val >= 0,
            message: "O preço não pode ser negativo.",
          },
        },
      };
      const { itemName, itemPrice } = await getPrompt(itemSchema);
      items.push({ itemName, itemPrice });
    }

    const total = items.reduce((sum, i) => sum + i.itemPrice, 0);
    const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
    const fileName = `fatura_${timestamp}.txt`;

    const invoiceText = `
FATURA - ${format(new Date(), "dd/MM/yyyy HH:mm")}
Cliente: ${customerName}
Pagamento: ${paymentMethod}

Produtos:
${items.map((i) => `- ${i.itemName} - ${formatPrice(i.itemPrice)}`).join("\n")}

TOTAL: ${formatPrice(total)}
`.trim();

    fs.writeFileSync(fileName, invoiceText);
    console.log(chalk.green(`\n✅ Fatura criada com sucesso!`));
    console.log(chalk.blue(`📄 Arquivo salvo: ${fileName}\n`));
  } catch (error) {
    console.log(chalk.red("\n❌ Operação cancelada ou ocorreu um erro.\n"));
  }
}

export default createInvoice;
