import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Loader, Lock, Save } from "lucide-react";
import { useAuthStore } from "../context/authStore";
import { ShopContext } from "../context/ShopContext";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const SetPassword = () => {
    const { setPassword, isLoading } = useAuthStore();
    const { navigate, theme } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        password: "",
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
            const data = await setPassword(formData.password, formData.confirmPassword);
            toast.success(data.message);
            navigate("/profile");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="border-t pt-14 min-h-[80vh]">
            <div className="max-w-2xl mx-auto px-4">
                <div className="shadow-md rounded-2xl p-6 sm:p-8 border">
                    <h1 className="text-2xl font-semibold mb-2">Set Password</h1>
                    <p className="--text1-color mb-6">
                        Create a password so you can also log in manually with email and
                        password.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-5">
                        <Input
                            icon={Lock}
                            type="password"
                            name="password"
                            placeholder="New password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        <PasswordStrengthMeter password={formData.password} />

                        <Input
                            icon={Lock}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
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

export default SetPassword;