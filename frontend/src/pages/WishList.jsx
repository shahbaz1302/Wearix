import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Wishlist = () => {
  const { products, wishlistItems, removeFromWishlist, currency, navigate, theme } =
    useContext(ShopContext);

  const wishlistProducts = products.filter((item) => wishlistItems[item._id]);

  return (
    <div className="w-full min-h-screen py-8">
      <div className="text-3xl mb-2">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="border rounded-lg p-10 text-center">
          <Heart className="mx-auto mb-4 --text3-color" size={50} />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="--text1-color mb-6">
            Save products you like and view them here later.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} flex gap-2 items-center mx-auto px-8 py-2 font-light cursor-pointer rounded-sm transition-colors duration-350`}
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {wishlistProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;