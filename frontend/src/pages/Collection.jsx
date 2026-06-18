import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useMemo } from "react";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevant")

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = [...products]

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category==="Men") {
      productsCopy = productsCopy.filter(item => item.category==="Men")
    }
    else{
      productsCopy = productsCopy.filter(item => item.category==="Women")
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = filterProducts.slice()
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="Dropdown Icon" />
        </p>

        {/* Category Filter */}
        <div className={`border w-fit rounded-4xl border-gray-300 p-2 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <div className="flex gap-1.5 text-sm font-light">
              <button className={`w-fit px-3 py-2 rounded-4xl ${category==="Men"?"bg-[#edc1c0] text-gray-700":""} transition-all duration-100 ease-in-out`} onClick={()=>setCategory("Men")}>Men</button>
              <button className={`w-fit  px-3 py-2 rounded-4xl ${category==="Women"?"bg-[#edc1c0] text-gray-700":""} transition-all duration-100 ease-in-out`} onClick={()=>setCategory("Women")}>Women</button>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">SUB CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light var(--text-color)">
            <p className={`flex gap-2 ${category==="Men"?"hidden":""}`}>
              <input className="w-3" type="checkbox" value={"Tops"} onChange={toggleSubCategory} /> Tops
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"T-Shirts"} onChange={toggleSubCategory} /> T-Shirts
            </p>
            <p className={`flex gap-2 ${category==="Women"?"hidden":""}`}>
              <input className="w-3" type="checkbox" value={"Polos"} onChange={toggleSubCategory} /> Polos
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Shirts"} onChange={toggleSubCategory} /> Shirts
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Jeans"} onChange={toggleSubCategory} /> Jeans
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Hoodies"} onChange={toggleSubCategory} /> Hoodies
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Jackets"} onChange={toggleSubCategory} /> Jackets
            </p>
            <p className={`flex gap-2 ${category==="Women"?"hidden":""}`}>
              <input className="w-3" type="checkbox" value={"Sneakers"} onChange={toggleSubCategory} /> Sneakers
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="w-full sm:w-auto border-2 border-gray-300 text-sm px-2">
            <option className="text-gray-700" value="relevant">Sort by : Relevant</option>
            <option className="text-gray-700" value="low-high">Sort by : Low to High</option>
            <option className="text-gray-700" value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection