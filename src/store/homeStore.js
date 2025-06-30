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
        Query.orderAsc("index"),
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

  deleteLink: async (linkId) => {
    try {
      await db.links.delete(linkId);
      // Update state
      set((state) => ({
        links: state.links.filter((link) => link.$id !== linkId),
        activeLinks: state.activeLinks - 1,
      }));
      return { success: true, message: "Link deleted successfully" };
    } catch (error) {
      console.error(error);
    }
  },

  toggleLink: async (linkId, currentActive, isPRO) => {
    try {
      // get user and links
      const user = await account.get();
      const links = await db.links.list([
        Query.equal("userId", user.$id),
        Query.equal("active", true),
      ]);

      // check if user has more than 3 links skip for pro
      if (!isPRO && links.documents.length >= 3 && currentActive === false) {
        return { success: false, message: "Need more active links? Go PRO" };
      }

      // Toggle active state
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

  updateLink: async (linkId, data) => {
    try {
      await db.links.update(linkId, data);
      set((state) => ({
        links: state.links.map((link) =>
          link.$id === linkId ? { ...link, ...data } : link
        ),
      }));
      return { success: true, message: "Link updated successfully" };
    } catch (error) {
      console.log(error);
    }
  },

  // Reorder link
  reorderLinks: async (linkId, direction) => {
    try {
      set((state) => {
        const links = [...state.links];
        const currentIndex = links.findIndex((l) => l.$id === linkId);

        // Determine target index based on direction
        const targetIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;

        // Bounds check
        if (targetIndex < 0 || targetIndex >= links.length) return { links };

        // Swap links
        [links[currentIndex], links[targetIndex]] = [
          links[targetIndex],
          links[currentIndex],
        ];

        // Update indexes in state
        const reorderedLinks = links.map((link, idx) => ({
          ...link,
          index: idx,
        }));

        return { links: reorderedLinks };
      });

      // After state is updated, sync indexes to DB
      const updatedLinks = useHomeStore.getState().links;
      await Promise.all(
        updatedLinks.map((link, idx) =>
          db.links.update(link.$id, { index: idx })
        )
      );
    } catch (error) {
      console.error("Error reordering links:", error);
    }
  },
}));

export default useHomeStore;
