import { create } from "zustand";
import db from "../appwrite/databases";
import { account, databases } from "../appwrite/config";
import { Permission, Query, Role } from "appwrite";

const useHomeStore = create((set) => ({
  links: [],
  activeLinks: 0,

  fetchLinks: async () => {
    try {
      const user = await account.get();
      const links = await db.links.list([
        Query.equal("userId", user.$id),
        Query.orderDesc("index"),
      ]);
      const active = await db.links.list([
        Query.equal("userId", user.$id),
        Query.equal("active", true),
      ]);

      set({ links: links.documents, activeLinks: active.documents.length });
    } catch (error) {
      console.log(error);
    }
  },

  addLink: async (data) => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID_LINKSTACK,
        import.meta.env.VITE_COLLECTION_ID_LINKS,
        [
          Query.equal("userId", data.userId),
          Query.orderDesc("index"),
          Query.limit(1),
        ]
      );

      const maxIndexLink = result.documents[0];
      const newIndex = maxIndexLink ? maxIndexLink.index + 1 : 0;

      const link = await db.links.create(
        {
          title: data.title,
          url: data.url,
          type: data.type,
          active: data.active,
          userId: data.userId,
          index: newIndex,
        },
        [
          Permission.read("any"),
          Permission.write(Role.user(data.userId)),
          Permission.read(Role.user(data.userId)),
          Permission.update(Role.user(data.userId)),
          Permission.delete(Role.user(data.userId)),
        ]
      );

      // Update state
      set((state) => ({ links: [...state.links, link] }));
      return { success: true, message: "Link added successfully" };
    } catch (error) {
      console.log(error);
    }
  },

  deleteLink: async () => {},

  toggleLink: async (linkId, currentActive) => {
    try {
      await db.links.update(linkId, {
        active: !currentActive,
      });

      // Update state
      set((state) => ({
        links: state.links.map((link) =>
          link.$id === linkId ? { ...link, active: !currentActive } : link
        ),
        activeLinks: currentActive
          ? state.activeLinks - 1
          : state.activeLinks + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateLink: async () => {},
}));

export default useHomeStore;
