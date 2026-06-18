import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useAuthStore } from "../context/authStore"
import axios from "axios"
import { User, Mail, Lock, Loader } from "lucide-react"
import { SiGoogle } from "react-icons/si";
import toast from "react-hot-toast"
import Input from "../components/Input"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"

const Login = () => {
  const [currentState, setCurrentState] = useState("Login")
  const { theme, navigate, getUserCart, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const { signup, error, login } = useAuthStore();

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (currentState === "Sign Up") {
        await signup(email, password, name);
        navigate("/");
        await getUserCart()
      }
      else {
        await login(email, password);
        await getUserCart()
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const loginWithGoogle = () => {
    window.location.href = `${backendUrl}/user/google`
  }

  return (
    <div className="flex flex-col border px-5 py-5 rounded-lg items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-0 text-(--news-color)">
      <form onSubmit={onSubmitHandler} className="flex flex-col rounded-lg items-center w-full sm:max-w-96 m-auto mb-3 gap-4 text-(--news-color)">
        <div className="inline-flex items-center gap-2 mb-2 mt-7">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-(--news-color)" />
        </div>
        {currentState === "Login" ? "" : <Input icon={User} onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder="Name" />}
        <Input icon={Mail} onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Email" />
        <Input icon={Lock} onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Password" />
        {currentState === "Sign Up" && <PasswordStrengthMeter password={password} />}
        <div className="w-full flex justify-between text-sm mt-2">
          <p onClick={() => navigate("/forgot-password")} className="cursor-pointer">Forgot your password?</p>
          {
            currentState === "Login"
              ? <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">Create account</p>
              : <p onClick={() => setCurrentState("Login")} className="cursor-pointer">Login Here</p>
          }
        </div>
        <button className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} w-full px-8 py-2 font-light cursor-pointer rounded-lg transition-colors duration-350`}>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
      </form>
      {currentState==="Login" && <p className="text-center">OR</p>}
      <button onClick={loginWithGoogle} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} ${currentState === "Login" ? "block" : "hidden"} w-full flex gap-2 items-center justify-center px-8 py-2 font-light mt-4 cursor-pointer rounded-lg transition-colors duration-350`}>
        <SiGoogle />Login with Google
      </button>
    </div>
  )
}

export default Login