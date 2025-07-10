import prompt from "prompt";

let started = false;

function startPromptOnce() {
  if (!started) {
    prompt.start();
    started = true;
  }
}

function getPrompt(schema) {
  startPromptOnce();

  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) {
        if (err.message === 'canceled') {
          console.log("\nOperação cancelada pelo usuário.");
          reject(new Error('canceled'));
        } else {
          reject(err);
        }
      } else {
        resolve(result);
      }
    });
  });
}

export default getPrompt;
