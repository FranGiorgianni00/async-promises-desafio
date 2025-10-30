  import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params?: Contact; // Hacemos params opcional
}

class ContactsController {
  contacts: ContactsCollection;

  constructor() {
    this.contacts = new ContactsCollection();
  }

  async init() {
    await this.contacts.load();
  }

  async processOptions(options: ContactsControllerOptions) {
    let resultado;
    try {
      if (options.action === "get" && options.params?.id) {
        resultado = this.contacts.getOneById(options.params.id);
      } else if (options.action === "get") {
        resultado = this.contacts.getAll();
      } else if (options.action === "save" && options.params) {
        this.contacts.addOne(options.params);
        await this.contacts.save();
        resultado = { message: "Contacto guardado correctamente." };
      }
    } catch (error) {
      console.error("Error en processOptions:", error);
      resultado = { error: error.message };
    }
    return resultado;
  }
}

export { ContactsController };
