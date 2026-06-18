import { useContext, useEffect, useState } from "react";
import { User, Mail, Loader, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../context/authStore";
import { ShopContext } from "../context/ShopContext";

const EditProfile = () => {
  const { user, checkAuth, updateProfile, isLoading } = useAuthStore();
  const { navigate, theme } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(formData.name);
      toast.success(response.message || "Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="shadow-md rounded-2xl p-6 sm:p-8 border">
          <h1 className="text-2xl font-semibold mb-2">Edit Profile</h1>
          <p className="--text1-color mb-6">
            Update your account details below.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              icon={User}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full flex gap-2 items-center justify-center px-8 py-3 font-light cursor-pointer rounded-xl transition-colors duration-350`}
            >
              {isLoading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
          <button onClick={()=>navigate("/profile")} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full flex gap-2 items-center justify-center mt-4 px-8 py-3 font-light cursor-pointer rounded-xl transition-colors duration-350`}>
            <ArrowLeft size={18} />
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;