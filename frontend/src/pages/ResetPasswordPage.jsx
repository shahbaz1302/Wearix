import { useContext, useState } from "react";
import { useAuthStore } from "../context/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();
    const { theme } = useContext(ShopContext)

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <div
            className='max-w-md w-full mx-auto my-50 rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center --text-color'>
                    Reset Password
                </h2>
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} px-8 w-fit py-2 font-light mt-4 cursor-pointer rounded-sm transition-colors duration-350`}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Set New Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ResetPasswordPage;