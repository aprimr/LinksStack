import { create } from "zustand";
import { account } from "../appwrite/config";
import db from "../appwrite/databases";
import { Query } from "appwrite";

const useSettingsStore = create((set) => ({
  sessions: [],
  theme: "obsidian",

  // Get all sessions
  getSessions: async () => {
    try {
      const res = await account.listSessions();
      set({ sessions: res.sessions.reverse() });
      return { success: true };
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return { success: false, message: error.message };
    }
  },

  // Delete session
  deletesession: async (sessionId) => {
    try {
      await account.deleteSession(sessionId);
      return { success: true, message: "Session deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  },

  // update profie slug
  updateProfileSlug: async (id, slug) => {
    try {
      const res = await db.userDetails.list([Query.equal("profileSlug", slug)]);
      if (res.documents.length > 0)
        return { success: false, message: "Slug is not available" };
      await db.userDetails.update(id, { profileSlug: slug });
      return { success: true, available: res.total === 0 };
    } catch (error) {
      console.error("Error updating profile slug:", error);
      return { success: false, message: error.message };
    }
  },

  updateProfileInfo: async (userId, data) => {
    try {
      await account.updateName(data.name);
      await db.userDetails.update(userId, { name: data.name, bio: data.bio });
      set({ name: data.name, bio: data.bio });
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Error updating profile info:", error);
      return { success: false, message: error.message };
    }
  },

  // Update Password
  updatePassword: async (oldPassword, newPassword) => {
    try {
      await account.updatePassword(newPassword, oldPassword);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Error updating password" };
    }
  },

  // Update theme
  updateTheme: async (id, theme) => {
    try {
      await db.userDetails.update(id, { theme: theme });
      set({ theme });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error updating theme" };
    }
  },
}));

export default useSettingsStore;
