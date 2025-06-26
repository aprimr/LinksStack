import { Client, Account, Databases, Storage, Functions } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setDevKey(import.meta.env.VITE_APPWRITE_DEV_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export { ID } from "appwrite";

export default client;
