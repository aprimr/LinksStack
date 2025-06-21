import { Query } from "appwrite";
import db from "../appwrite/databases";

async function generateSlug(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug;
  let attempts = 0;
  const maxAttempts = 5;

  do {
    // Generate new slug
    slug = "";
    for (let i = 0; i < length; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check if slug exists
    const { total } = await db.userDetails.list([
      Query.equal("profileSlug", slug),
    ]);

    if (total === 0) return slug;
    attempts++;
  } while (attempts < maxAttempts);

  // Fallback if all attempts fail
  return `${slug}-${Math.floor(Math.random() * 10)}`;
}

export default generateSlug;
