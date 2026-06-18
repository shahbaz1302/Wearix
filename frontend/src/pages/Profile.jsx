import { useEffect } from 'react';
import { useAuthStore } from "../context/authStore"
import { Calendar, Mail, CircleCheck, CircleAlert, SendHorizontal, UserRoundPen, UserRoundKey, Power } from "lucide-react"
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import Title from '../components/Title';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const { user, checkAuth, resendVerificationEmail } = useAuthStore()
  const { navigate, theme } = useContext(ShopContext)

  const verifyUser = async () => {
    try {
      navigate("/verify-email")
      await resendVerificationEmail(user.email);
      toast.success("Verification code sent to your email!");
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading profile...</div>
      </div>
    );
  }

  return <>
    <main className="container mx-auto px-4 py-8 max-w-4xl text-(--news-color)">
      <div className='text-3xl mb-8'>
        <Title text1={"YOUR"} text2={"PROFILE"} />
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden border">
        <div className="p-6 sm:flex items-center border-b">
          <div className="shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <div className="h-24 w-24 rounded-full flex items-center justify-center text-blue-600 bg-blue-100 text-3xl font-bold overflow-hidden">
              {user.image?.trim() ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
          <div className="grow">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-(--footer-text) flex items-center gap-2 mt-1">
              <Mail size={18} />
              {user.email}
            </p>
            <p className="text-sm text-(--text3-color) flex items-center gap-2 mt-1">
              <Calendar size={18} />
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-(--text2-color)">Email Verification:</span>
            {user.isVerified ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
                <CircleCheck size={18} /> Verified
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 text-red-700 text-sm">
                  <CircleAlert size={18} /> Not Verified
                </span>
                <SendHorizontal size={18} />
                <button onClick={verifyUser} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} inline-flex gap-2 items-center px-3 py-1 font-light cursor-pointer rounded-sm transition-colors duration-350`}>
                  Verify Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button onClick={() => navigate("/edit-profile")} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} flex gap-2 items-center px-8 py-2 font-light cursor-pointer rounded-sm transition-colors duration-350`}>
          <UserRoundPen size={18} /> Edit Profile
        </button>

        {user.hasPassword ? (<button onClick={() => navigate("/change-password")} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} flex gap-2 items-center px-8 py-2 font-light cursor-pointer rounded-sm transition-colors duration-350`}>
          <UserRoundKey size={18} /> Change Password
        </button>) : (<button onClick={() => navigate("/set-password")} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} flex gap-2 items-center px-8 py-2 font-light cursor-pointer rounded-sm transition-colors duration-350`}>
          <UserRoundKey size={18} /> Set Password
        </button>)}
      </div>
    </main>
  </>;
};

export default Profile;