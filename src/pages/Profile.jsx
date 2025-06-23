import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Settings,
  Calendar,
  Mail,
  Crown,
  Globe,
  BarChart2,
  Palette,
  Layers2,
  LogOut,
  Loader2,
  Trash,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import ProBadge from "../components/ProBadge";
import useAuthStore from "../store/authStore";
import LinksStackLogo from "../assets/logo.png";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const userDetails = useAuthStore((state) => state.userDetails);
  const isPremium = useAuthStore((state) => state.isPremium);
  const updateProfilePic = useAuthStore((state) => state.updateProfilePic);
  const deleteProfilePic = useAuthStore((state) => state.deleteProfilePic);
  const logout = useAuthStore((state) => state.logout);

  const [profilePic, setProfilePic] = useState(userDetails?.avatarUrl || null);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [expandBio, setExpandBio] = useState(false);

  const handleImageUpload = async (e) => {
    setProfilePicLoading(true);

    try {
      const file = e.target.files[0];

      // Check file size
      if (!file || file.size > 50 * 1024 * 1024) {
        toast.error("Image size should be less than 50 MB");
        setProfilePicLoading(false);
        return;
      }

      // Read as base64 string (preview image)
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("Failed to read file.");
        reader.readAsDataURL(file);
      });

      setProfilePic(base64String);

      // Upload image to Appwrite bucket
      await updateProfilePic(file, user, userDetails);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
    } finally {
      setProfilePicLoading(false);
    }
  };

  const handleProfilePicDelete = async () => {
    setProfilePicLoading(true);
    try {
      await deleteProfilePic(user, userDetails);
      setProfilePic(null);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting image");
    } finally {
      setProfilePicLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-900 text-white font-sans overflow-hidden pt-32 md:pt-20 pb-16">
      {/* Main Content Container */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 w-full">
        {/* Profile Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Desktop Layout  */}
          <div className="hidden md:flex flex-row items-start gap-8 pt-14">
            {/* Profile Picture */}
            <div className="relative group flex-shrink-0 w-40 h-40">
              <div className="rounded-full bg-gradient-to-br from-sky-500 via-sky-500 to-sky-400 p-1.5 shadow-lg w-full h-full">
                {profilePicLoading ? (
                  <div className="h-full w-full flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-full">
                    <Loader2 className="w-[5rem] h-[5rem] animate-spin rounded-full stroke-[1.5]" />
                  </div>
                ) : (
                  <img
                    src={profilePic || LinksStackLogo}
                    alt={user?.name}
                    className="w-full h-full rounded-full object-cover border-4 border-gray-900 bg-gradient-to-br from-gray-950 via-sky-800 to-gray-900"
                  />
                )}
              </div>
              {!userDetails?.avatarUrl ? (
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm border border-white/10 transition-all duration-300 lg:opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <Edit2 className="w-5 h-5 text-white" />
                </label>
              ) : (
                <button
                  onClick={handleProfilePicDelete}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-rose-600/80 hover:bg-rose-500/90 backdrop-blur-sm border border-white/10 transition-all duration-300 lg:opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <Trash className="w-5 h-5 text-white" />
                </button>
              )}
              <input
                type="file"
                name="profilePic"
                id="profilePic"
                accept="image/jpeg, image/png, image/jpg"
                hidden
                onChange={(e) => handleImageUpload(e)}
              />
            </div>

            {/* Profile Info - Desktop */}
            <div className="flex-1 space-y-2">
              <div className="relative flex justify-between items-start">
                <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 brightness-125">
                  {user?.name}
                </h1>
                <div className="absolute top-0 right-0 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800/50 hover:bg-gray-700/60 rounded-full backdrop-blur-sm border border-gray-700/30">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => logout()}
                      className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800/50 hover:bg-gray-700/60 rounded-full backdrop-blur-sm border border-gray-700/30"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                  {isPremium && <ProBadge />}
                </div>
              </div>

              <p
                onClick={() => setExpandBio(!expandBio)}
                className={`text-gray-300 text-base max-w-2xl font-poppins cursor-pointer ${
                  expandBio ? "" : "line-clamp-3"
                }`}
              >
                {userDetails?.bio || "No bio added yet."}
              </p>

              <NavLink
                to={`/${userDetails?.profileSlug}`}
                className="inline-flex items-center gap-2 text-sm md:text-base text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/60 transition-colors"
              >
                <Layers2 className="w-5 h-5" />
                <span className="truncate max-w-xs">{`${
                  import.meta.env.VITE_FRONTEND_URL.split("//")[1]
                }/${userDetails?.profileSlug}`}</span>
              </NavLink>

              <div className="flex flex-wrap items-center gap-4 ">
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full">
                  <Mail className="w-5 h-5" />
                  <span className="truncate max-w-xs">{user?.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm md:text-base text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Joined{" "}
                    {new Date(user?.$createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout  */}
          <div className="md:hidden flex flex-col gap-4 pt-3">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="relative group w-20 h-20">
                <div className="rounded-full bg-gradient-to-br from-sky-500 via-sky-500 to-sky-400 p-0.5 shadow-lg w-full h-full">
                  {profilePicLoading ? (
                    <div className="h-full w-full flex justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-full">
                      <Loader2 className="w-[2rem] h-[2rem] animate-spin rounded-full stroke-[1.5]" />
                    </div>
                  ) : (
                    <img
                      src={profilePic || LinksStackLogo}
                      alt={user?.name}
                      className="w-full h-full rounded-full object-cover border-4 border-gray-900 from-gray-950 bg-gradient-to-br via-sky-800 to-gray-900"
                    />
                  )}
                </div>

                {!userDetails?.avatarUrl ? (
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-1 right-1 bg-gray-800/80 hover:bg-gray-700/90 p-1.5 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-200 opacity-100 lg:opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4 text-white" />
                  </label>
                ) : (
                  <button
                    onClick={handleProfilePicDelete}
                    className="absolute bottom-1 right-1 bg-rose-600/80 hover:bg-rose-500/90 p-1 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-200 opacity-100 lg:opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash className="w-4 h-4 text-white" />
                  </button>
                )}

                <input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  accept="image/jpeg, image/png, image/jpg"
                  hidden
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>

              {/* Name, bio and Actions */}
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 line-clamp-1">
                    {user?.name}
                  </h1>
                  <p className="text-gray-400 text-sm line-clamp-2 font-poppins">
                    {userDetails?.bio || "No bio added yet."}
                  </p>
                </div>

                <div className="flex flex-col-reverse items-end gap-2">
                  {isPremium && <ProBadge />}
                  <div>
                    <button className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800/50 hover:bg-gray-700/60 rounded-full backdrop-blur-sm border border-gray-700/30 shadow-sm hover:shadow-md">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => logout()}
                      className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800/50 hover:bg-gray-700/60 rounded-full backdrop-blur-sm border border-gray-700/30 shadow-sm hover:shadow-md"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ProfileLink, Email, joined date */}
            <div className="space-y-3">
              <div className="space-y-2 ">
                <NavLink to={`/${userDetails?.profileSlug}`}>
                  <div className=" inline-flex  items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full">
                    <Layers2 className="w-4 h-4" />
                    <span className="truncate">
                      {`${import.meta.env.VITE_FRONTEND_URL.split("//")[1]}/${
                        userDetails?.profileSlug
                      }`}
                    </span>
                  </div>
                </NavLink>
                <div className="flex flex-row  gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(user?.$createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Premium Features Showcase */}
        {!isPremium && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative bg-gradient-to-r from-amber-900/30 via-gray-900 to-purple-900/30 rounded-2xl p-8 border border-amber-500/20 shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white">
                    Unlock Premium Features
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: Globe, text: "Custom Domains" },
                      { icon: BarChart2, text: "Advanced Analytics" },
                      { icon: Palette, text: "Premium Themes" },
                      { icon: Zap, text: "Dedicated Support" },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-amber-500/10 text-amber-400">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <NavLink
                  to="/upgrade"
                  className="flex-shrink-0 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-gray-900 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Upgrade Now
                </NavLink>
              </div>
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl -z-10"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl -z-10"></div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Profile;
