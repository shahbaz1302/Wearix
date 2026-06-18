import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const NewsLetterBox = () => {
    const{theme}=useContext(ShopContext)

    const onSubmitHandler=(event)=>{
        event.preventDefault()
    }

  return (
    <div className="text-center my-15">
        <p className="text-2xl font-medium --news-color">Subscribe now & get 10% off</p>
        <p className="--text3-color mt-3">Stay in the loop—subscribe to get exclusive offers, updates, and the latest trends delivered to your inbox.</p>

        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" required />
            <button type="submit" className={`${theme==="light"?"bg-black text-white":"bg-white text-black"} text-xs px-10 py-4`}>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox