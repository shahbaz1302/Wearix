import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const Title = ({text1,text2}) => {
  const{theme}=useContext(ShopContext)

  return (
    <div className="inline-flex gap-2 items-center mb-3">
        <p className="var(--text1-color)">{text1} <span className="var(--text2-color) font-medium">{text2}</span></p>
        <p className={`w-8 sm:w-12 h-px sm:h-0.5 ${theme==="light"?"bg-gray-700":"bg-white"}`}></p>
    </div>
  )
}

export default Title