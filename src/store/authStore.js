import { create } from "zustand";
import { ID, account } from "../appwrite/config";
import db from "../appwrite/databases";
import bucket from "../appwrite/storage";
import generateSlug from "../utils/generateSlug";
import { Permission, Query, Role } from "appwrite";

const useAuthStore = create((set) => ({
  user: null,
  userDetails: null,
  isPremium: false,
  loading: true,

  // Check if session exists
  checkSession: async () => {
    try {
      const user = await account.get();
      let isPremium = false;
      let userDetails = null;

      try {
        const response = await db.userDetails.list([
          Query.equal("email", user.email),
        ]);

        if (response.documents.length > 0) {
          userDetails = response.documents[0];
          isPremium = userDetails.isPremium === true;
        }
      } catch (err) {
        if (err.code !== 404) console.error("Premium check failed:", err);
      }

      set({
        user,
        userDetails,
        isPremium,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      set({ user: null, userDetails: null, isPremium: false, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Login
  login: async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      // Check premium status and get user details
      let isPremium = false;
      let userDetails = null;
      try {
        const response = await db.userDetails.list([
          Query.equal("userId", user.$id),
        ]);

        if (response.documents.length > 0) {
          userDetails = response.documents[0];
          isPremium = userDetails.isPremium === true;
        }
      } catch (err) {
        if (err.code !== 404) console.error("User details fetch failed:", err);
      }

      set({ user, userDetails, isPremium, loading: false });
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },

  // Signup
  signup: async (email, password, name) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      await account.createVerification(
        import.meta.env.VITE_FRONTEND_URL + "/account/verify"
      );

      const profileSlug = await generateSlug();
      const userDetails = await db.userDetails.create(
        {
          userId: user.$id,
          name,
          email,
          bio: "",
          profileSlug,
          isPremium: false,
          transactionDetails: "",
          avatarUrl: "",
          avatarId: "",
        },
        [Permission.read(Role.any()), Permission.update(Role.user(user.$id))],
        ID.unique()
      );

      set({ user, userDetails, isPremium: false, loading: false });
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },

  // update profile pic
  updateProfilePic: async (file, user, userDetails) => {
    try {
      // delete cached profile pic before updating
      if (userDetails.avatarId) {
        try {
          await bucket.profilePics.delete(userDetails.avatarId);
        } catch (err) {
          console.warn("Previous profile pic not found or already deleted.");
        }
      }

      // update profile pic in bucket
      const res = await bucket.profilePics.create(file, user.$id, [
        Permission.read("any"),
        Permission.write("user:" + user.$id),
        Permission.delete("user:" + user.$id),
      ]);

      // get profile pic url
      const version = Date.now().toString();
      const url =
        (await bucket.profilePics.getView(res.$id)) + `&version=${version}`;

      // update profile id and url in database
      const response = await db.userDetails.update(
        userDetails.$id,
        {
          avatarUrl: url,
          avatarId: res.$id,
          avatarVer: version.toString(),
        },
        [
          Permission.read("any"),
          Permission.update("user:" + user.$id),
          Permission.delete("user:" + user.$id),
        ]
      );

      set({ userDetails: response });
      return { success: true };
    } catch (error) {
      console.error("Profile pic update failed:", error);
    }
  },

  // delete profile pic
  deleteProfilePic: async (user, userDetails) => {
    try {
      // Delete from bucket
      await bucket.profilePics.delete(userDetails.avatarId);

      // Update DB: remove avatar URL
      const response = await db.userDetails.update(
        userDetails.$id,
        { avatarUrl: "", avatarId: "", avatarVer: "" },
        [
          Permission.read("any"),
          Permission.update(`user:${user.$id}`),
          Permission.delete(`user:${user.$id}`),
        ]
      );

      set({ userDetails: response });

      return { success: true };
    } catch (error) {
      console.error("Profile pic deletion failed:", error);
      return { success: false, message: error.message };
    }
  },

  // Send verification link action
  sendVerificationLink: async () => {
    try {
      await account.createVerification(
        import.meta.env.VITE_FRONTEND_URL + "/account/verify"
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Verify email
  verifyEmail: async (userId, secret) => {
    try {
      await account.updateVerification(userId, secret);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  upgrade: async (uId, data) => {
    try {
      set({ loading: true });

      const user = await account.get();

      // Check if user matches current user
      if (user.$id !== uId) {
        console.error("User ID mismatch. Aborting upgrade.");
        set({ loading: false });
        return { success: false, message: "User ID mismatch." };
      }

      // Fetch userDetails document
      const response = await db.userDetails.list([
        Query.equal("userId", user.$id),
      ]);

      const userDoc = response?.documents?.[0];

      if (!userDoc) {
        console.error("No userDetails document found.");
        set({ loading: false });
        return { success: false, message: "User details not found." };
      }

      const transactionDetailsString = JSON.stringify({
        transactionCode: String(data.transaction_code),
        transactionUUID: String(data.transaction_uuid),
        amount: String(data.total_amount),
        status: String(data.status),
        productCode: String(data.product_code),
        transactionDate: new Date().toString(),
      });

      // Update userDetails with premium true and transaction data
      await db.userDetails.update(userDoc.$id, {
        isPremium: true,
        transactionDetails: transactionDetailsString,
      });

      // Update state
      const updatedDetails = await db.userDetails.get(userDoc.$id);

      set({
        isPremium: true,
        userDetails: updatedDetails,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Upgrade error:", error);
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true });
      await account.deleteSession("current");
      set({ user: null, userDetails: null, isPremium: false, loading: false });
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      set({ loading: false });
      return { success: false, message: error.message };
    }
  },
}));

export default useAuthStore;
