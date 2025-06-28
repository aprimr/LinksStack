import { databases } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID_LINKSTACK,
    id: import.meta.env.VITE_COLLECTION_ID_USER_DETAILS,
    name: "userDetails",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID_LINKSTACK,
    id: import.meta.env.VITE_COLLECTION_ID_TICKETS,
    name: "tickets",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID_LINKSTACK,
    id: import.meta.env.VITE_COLLECTION_ID_LINKS,
    name: "links",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (data, permissions = [], id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, data, permissions),

    update: (id, data, permissions = []) =>
      databases.updateDocument(col.dbId, col.id, id, data, permissions),

    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
