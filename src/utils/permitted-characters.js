async function permittedCharacters() {
  let permitted = [];

  if (process.env.UPPERCASE_LETTERS === "true")
    permitted.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  if (process.env.LOWERCASE_LETTERS === "true")
    permitted.push(..."abcdefghijklmnopqrstuvwxyz");

  if (process.env.NUMBERS === "true")
    permitted.push(..."0123456789");

  if (process.env.SPECIAL_CHARACTERS === "true")
    permitted.push(..."!@#$%^&*()-_");

  if (permitted.length === 0) {
    console.warn(
      "[permittedCharacters] Atenção: Nenhuma família de caracteres habilitada nas variáveis de ambiente. A senha resultante será vazia."
    );
  }

  return permitted;
}

export default permittedCharacters;
