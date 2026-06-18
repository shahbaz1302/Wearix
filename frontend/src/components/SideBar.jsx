import { NavLink } from "react-router-dom";
import { useAuthStore } from "../context/authStore";
import { useContext, useEffect, useState } from "react";
import { Trash, Power } from "lucide-react"
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const DeleteAccountModal = ({ theme, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-xl p-6 ${theme === "dark" ? "bg-neutral-900 text-white" : "bg-white text-black"
          }`}
      >
        <h2 className="text-xl font-semibold mb-3">Delete Account?</h2>
        <p className="text-sm mb-6 text-gray-500">
          This action is permanent. Your account and related data will be removed
          from the database and cannot be recovered.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md bg-gray-100 text-black"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
  const { user, logout, checkAuth, deleteAccount } = useAuthStore()
  const { theme, navigate, setCartItems } = useContext(ShopContext)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const logoutUser = async () => {
    try {
      await logout()
      setCartItems({})
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setCartItems({});
      toast.success("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "WishList", path: "/wishlist" },
    { name: "Orders", path: "/orders" },
  ];

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!user) {
    return;
  }

  return (
    <>
      <aside className={`w-full border pb-4 border-neutral-200 rounded-md mt-10 h-fit`}>
        <div className={`sm:border-b p-5 border-neutral-200`}>
          <h2 className="text-lg font-semibold --news-color">{user.name}</h2>
          <p onClick={() => setShowFilter(!showFilter)} className="text-sm text-neutral-500 mt-1 flex items-center gap-2">Manage your account here
            <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="Dropdown Icon" />
          </p>
        </div>

        <div onClick={()=>setShowFilter(false)} className={`${showFilter ? "" : "hidden"} sm:flex flex flex-col `}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-5 py-4 border-b text-sm transition ${isActive
                  ? "text-gray-700 bg-[#ffebf5] font-medium"
                  : "--text2-color"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setShowDeleteModal(true)} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} ${showFilter ? "" : "hidden"} sm:flex flex gap-2 items-center justify-center px-8 py-2 font-light mx-auto mt-10 w-[90%] cursor-pointer rounded-sm transition-colors duration-350`}>
          <Trash size={18} /> Delete my Account
        </button>
        <button onClick={logoutUser} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} ${showFilter ? "" : "hidden"} sm:flex flex gap-2 items-center justify-center mx-auto mt-3 w-[90%] px-8 py-2 font-light cursor-pointer rounded-sm transition-colors duration-350`}>
          <Power size={18} /> Logout
        </button>
      </aside>

      {showDeleteModal && (
        <DeleteAccountModal
          theme={theme}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </>
  );
};

export default SideBar;