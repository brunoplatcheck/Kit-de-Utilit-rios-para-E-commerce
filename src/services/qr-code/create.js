import prompt from "prompt";
import promptSchemaQRCode from "../../prompts-schema/prompt-schema-qrcode.js";
import handle from "./handle.js";

function createQRCode() {
  prompt.start();
  prompt.get(promptSchemaQRCode, (err, result) => {
    if (err) {
      if (err.message === 'canceled') {
        console.log("\nOperação cancelada pelo usuário.");
        return;
      }
      console.error("Erro no prompt:", err);
      return;
    }
    handle(null, result);
  });
}

export default createQRCode;
