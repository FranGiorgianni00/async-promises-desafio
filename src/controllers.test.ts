import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsCollection } from "./models"; // Asegúrate de importar el modelo

test("Testeo el método processOptions para guardar un contacto", async (t) => {
  const controller = new ContactsController();
  await controller.init(); // Inicializar el controller

  const mockContact = { id: 1, name: "Ana" };
  await controller.processOptions({ action: "save", params: mockContact });

  const allContacts = await controller.processOptions({ action: "get" });
  t.deepEqual(allContacts, [
    { id: 1, name: "Ana" },
    { id: 2, name: "Paula" },
    { id: 3, name: "Mer" },
    { id: 4, name: "Dana" },
    { id: 30, name: "Marce" },
    { id: 3333, name: "marce 3333" },
  ]); // Verificamos que el contacto se haya guardado
});
