import fs from "fs";
import chalk from "chalk";
import PDFDocument from "pdfkit";
import { format } from "date-fns";
import getPrompt from "../../utils/prompt-helper.js";

async function createLabel() {
  try {
    const schema = {
      properties: {
        name: {
          description: "Nome do cliente",
          required: true,
        },
        address: {
          description: "Endereço completo",
          required: true,
        },
        product: {
          description: "Produto a ser enviado",
          required: true,
        },
      },
    };

    const { name, address, product } = await getPrompt(schema);

    const contentLines = [
      "--- ETIQUETA DE ENVIO ---",
      `Cliente: ${name}`,
      `Endereço: ${address}`,
      `Produto: ${product}`,
      "---------------------------",
    ];

    const content = contentLines.join("\n");

    const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
    const txtFile = `etiqueta_${timestamp}.txt`;
    const pdfFile = `etiqueta_${timestamp}.pdf`;

    // Salvar arquivo txt
    fs.writeFileSync(txtFile, content);

    // Criar PDF com formatação simples
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(pdfFile);
    doc.pipe(stream);

    doc.fontSize(16).font("Helvetica-Bold").text("ETIQUETA DE ENVIO", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).font("Helvetica");
    contentLines.slice(1, -1).forEach((line) => {
      doc.text(line);
      doc.moveDown(0.5);
    });
    doc.moveDown();
    doc.fontSize(10).text("---------------------------", { align: "center" });

    doc.end();

    stream.on("finish", () => {
      console.log(chalk.green("\n✅ Etiqueta gerada com sucesso!\n"));
      console.log(chalk.blue(`📄 TXT: ${txtFile}`));
      console.log(chalk.blue(`📄 PDF: ${pdfFile}\n`));
    });
  } catch (error) {
    console.log(chalk.red("\n❌ Erro ao gerar etiqueta:", error.message));
  }
}

export default createLabel;
