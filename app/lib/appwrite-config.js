import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Add your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Add your project ID

const databases = new Databases(client);
const storage = new Storage(client);

// Database and collection IDs - create these in your Appwrite console
const TESTIMONIES_DATABASE_ID = "67a4a2d500278725bfef";
const TESTIMONIES_COLLECTION_ID = "67a4a370003dfa336f3c";
const STORAGE_BUCKET_ID = "67a4a4930036798267f8";

export {
  client,
  databases,
  storage,
  STORAGE_BUCKET_ID,
  TESTIMONIES_COLLECTION_ID,
  TESTIMONIES_DATABASE_ID,
};
