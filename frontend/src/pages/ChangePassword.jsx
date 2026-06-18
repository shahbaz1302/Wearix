import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../context/authStore";
import { ShopContext } from "../context/ShopContext";

const ChangePassword = () => {
    const { changePassword, isLoading } = useAuthStore();
    const { navigate, theme } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

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
            const response = await changePassword(
                formData.currentPassword,
                formData.newPassword,
                formData.confirmPassword
            );
            toast.success(response.message || "Password changed successfully");
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            navigate("/profile")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="border-t pt-14 min-h-[80vh]">
            <div className="max-w-2xl mx-auto px-4">
                <div className="shadow-md rounded-2xl p-6 sm:p-8 border">
                    <h1 className="text-2xl font-semibold mb-2">Change Password</h1>
                    <p className="--text1-color mb-6">
                        Enter your current password and choose a strong new password.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-5">
                        <Input
                            icon={Lock}
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />

                        <Input
                            icon={Lock}
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />

                        <PasswordStrengthMeter password={formData.newPassword} />

                        <Input
                            icon={Lock}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full flex gap-2 items-center justify-center px-8 py-3 font-light cursor-pointer rounded-xl transition-colors duration-350`}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={18} />
                            ) : (
                                <Save size={18} />
                            )}
                            {isLoading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                    <button onClick={() => navigate("/profile")} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full flex gap-2 items-center justify-center px-8 py-3 font-light cursor-pointer rounded-xl transition-colors duration-350`}>
                        <ArrowLeft size={18} />
                        Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;