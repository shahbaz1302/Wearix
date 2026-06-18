import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import RelatedProducts from "../components/RelatedProducts"

const Product = () => {
  const { productId } = useParams()
  const { products, currency, theme, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer p-2 rounded-md border ${image === item ? "border-(--text-color)" : "border-transparent"
                  } transition-all duration-300`} />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" /><img src={assets.star_icon} className="w-3 5" /><img src={assets.star_icon} className="w-3 5" /><img src={assets.star_icon} className="w-3 5" /><img src={assets.star_dull_icon} className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 var(--text1-color) md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border-2 py-2 px-4 bg-gray-100 text-gray-500 cursor-pointer ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} px-8 py-3 text-sm active:bg-gray-700 cursor-pointer transition-colors duration-350`}>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm var(--text1-color) mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy Return and Exchange Policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-6 border px-6 py-6 text-sm text-(--text1-color)">
          <p>{productData.description}</p>
          <p>Country of Origin : USA</p>
          <p>Manufactured By - Wearix Pvt Ltd,
            4501 Innovation Way, Suite 200
            Austin, TX 78701
            UNITED STATES
          </p>
          <p>Packed By - Wearix Pvt Ltd,
            4501 Innovation Way, Suite 200
            Austin, TX 78701
            UNITED STATES
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product