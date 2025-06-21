import { storage } from "./config";
import { ID } from "appwrite";

const bucket = {};

const buckets = [
  {
    id: import.meta.env.VITE_APPWRITE_PROFILE_PICS_BUCKET_ID,
    name: "profilePics",
  },
];

buckets.forEach(({ id, name }) => {
  bucket[name] = {
    // Create/Upload a file
    create: (file, fileId = ID.unique(), permissions = []) =>
      storage.createFile(id, fileId, file, permissions),

    // Delete a file
    delete: (fileId) => storage.deleteFile(id, fileId),

    // List files
    list: (queries = []) => storage.listFiles(id, queries),

    // Get metadata
    get: (fileId) => storage.getFile(id, fileId),

    // Get preview
    getPreview: (
      fileId,
      width,
      height,
      gravity,
      quality,
      borderWidth,
      borderColor,
      borderRadius,
      opacity,
      rotation,
      background,
      output
    ) =>
      storage.getFilePreview(
        id,
        fileId,
        width,
        height,
        gravity,
        quality,
        borderWidth,
        borderColor,
        borderRadius,
        opacity,
        rotation,
        background,
        output
      ),

    // Get downloadable file
    getDownload: (fileId) => storage.getFileDownload(id, fileId),

    // Get viewable file
    getView: (fileId) => storage.getFileView(id, fileId),
  };
});

export default bucket;
