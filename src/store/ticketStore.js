import { create } from "zustand";
import db from "../appwrite/databases";
import { Permission, Query, Role } from "appwrite";

const useTicketStore = create((set) => ({
  tickets: [],

  fetchTickets: async (userId) => {
    if (!userId) return;
    try {
      const response = await db.tickets.list([Query.equal("userId", [userId])]);
      set({ tickets: response.documents });
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  },

  addTicket: async (userId, email, subject, ticketTag, message) => {
    try {
      const response = await db.tickets.create(
        {
          userId,
          email,
          subject,
          message,
          ticketTag,
          ticketStatus: "new",
          response: "",
          deletedAt: "",
        },
        [
          Permission.read("any"),
          Permission.write(Role.user(userId)),
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      set((state) => ({ tickets: [response, ...state.tickets] }));
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  },
}));

export default useTicketStore;
