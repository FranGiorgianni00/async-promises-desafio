 import * as jsonfile from "jsonfile";


export interface Contact {
  id: number;
  name: string;
}

export class ContactsCollection {
  data: Contact[] = [];

  async load() {
    const filePath = __dirname + "/contacts.json";
    console.log("Cargando desde:", filePath);
    try {
      this.data = await jsonfile.readFile(filePath);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
      this.data = [];
    }
  }

  async save() {
    const filePath = __dirname + "/contacts.json";
    console.log("Guardando en:", filePath);
    try {
      await jsonfile.writeFile(filePath, this.data);
      console.log("Contactos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los contactos:", error);
      throw error;
    }
  }

  addOne(contact: Contact) {
    this.data.push(contact);
  }

  getAll() {
    return this.data;
  }

  getOneById(id: number) {
    return this.data.find((c) => c.id === id);
  }
}
