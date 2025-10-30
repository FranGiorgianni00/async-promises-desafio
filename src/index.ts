 import { ContactsCollection } from "./models";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import minimist from "minimist";

function parseaParams(argv): ContactsControllerOptions {
  const resultado = minimist(argv);

  return {
    action: resultado.action,
    params: JSON.parse(resultado.params),
  };
}

async function main() {
  const controller = new ContactsController();
  await controller.init(); // Esperar a que se carguen los contactos
  const params = parseaParams(process.argv.slice(2));
  const result = await controller.processOptions(params); // Esperar el resultado
  console.log(result);
}

main();
