import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { backendUrl } from "../App"
import toast from "react-hot-toast"

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Shirts")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [commodity, setCommodity] = useState("Topwear")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    onSubmitHandler()
  },[])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20 cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20 cursor-pointer" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20 cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20 cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-125 px-3 py-2" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-125 px-3 py-2" type="text" placeholder="Write Content here" required />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="T-Shirts">T-Shirts</option>
            <option className={`${category === "Men" ? "hidden" : ""}`} value="Tops">Tops</option>
            <option className={`${category === "Women" ? "hidden" : ""}`} value="Polos">Polos</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Jackets">Jackets</option>
            <option className={`${category === "Women" ? "hidden" : ""}`} value="Sneakers">Sneakers</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Commodity</p>
          <select onChange={(e) => setCommodity(e.target.value)} className="w-full px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option className={`${category === "Women" ? "hidden" : ""}`} value="Footwear">Footwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-30" type="numeric" pattern="[0-9]*" placeholder="25" />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        {commodity === "Topwear" &&
          <div className="flex gap-3">
            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
              <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
              <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
              <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>}
        {commodity === "Bottomwear" &&
          <div className="flex gap-3">
            <div onClick={() => setSizes(prev => prev.includes("28") ? prev.filter(item => item !== "28") : [...prev, "28"])}>
              <p className={`${sizes.includes("28") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("30") ? prev.filter(item => item !== "30") : [...prev, "30"])}>
              <p className={`${sizes.includes("30") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("32") ? prev.filter(item => item !== "32") : [...prev, "32"])}>
              <p className={`${sizes.includes("32") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("34") ? prev.filter(item => item !== "34") : [...prev, "34"])}>
              <p className={`${sizes.includes("34") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("36") ? prev.filter(item => item !== "36") : [...prev, "36"])}>
              <p className={`${sizes.includes("36") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36</p>
            </div>
          </div>}
        {commodity === "Footwear" &&
          <div className={`flex gap-3`}>
            <div onClick={() => setSizes(prev => prev.includes("UK 6") ? prev.filter(item => item !== "UK 6") : [...prev, "UK 6"])}>
              <p className={`${sizes.includes("UK 6") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UK 6</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("UK 7") ? prev.filter(item => item !== "UK 7") : [...prev, "UK 7"])}>
              <p className={`${sizes.includes("UK 7") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UK 7</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("UK 8") ? prev.filter(item => item !== "UK 8") : [...prev, "UK 8"])}>
              <p className={`${sizes.includes("UK 8") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UK 8</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("UK 9") ? prev.filter(item => item !== "UK 9") : [...prev, "UK 9"])}>
              <p className={`${sizes.includes("UK 9") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UK 9</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("UK 10") ? prev.filter(item => item !== "UK 10") : [...prev, "UK 10"])}>
              <p className={`${sizes.includes("UK 10") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UK 10</p>
            </div>
          </div>}
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white cursor-pointer" type="submit">ADD</button>

    </form>
  )
}

export default Add