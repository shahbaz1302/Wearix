import { useContext } from "react"
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, isWishListed, removeFromWishlist, addToWishlist } = useContext(ShopContext);

  const wished = isWishListed(id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wished) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="--text-color cursor-pointer">
      <div className="overflow-hidden relative">
        <img src={image[0]} className="hover:scale-110 transition ease-in-out" alt="Product Image" />
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/45"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={`transition ${wished
              ? "fill-white text-white"
              : "text-white"
              }`}
          />
        </button>
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency} {price}</p>
    </Link>
  )
}

export default ProductItem