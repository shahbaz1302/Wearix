import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuthStore } from "./authStore";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "₹";
    const delivery_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [theme, setTheme] = useState("light")
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [wishlistItems, setWishlistItems] = useState({});
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthStore();

    const addToCart = async (itemId, size) => {
        if (!isAuthenticated) {
            toast.error("Please login to your account to add an item to cart");
            return
        }

        if (!size) {
            toast.error("Select Product Size")
            return
        }

        let cartData = structuredClone(cartItems || {})
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        try {
            await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) totalCount += cartItems[items][item]
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems || {});

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity
        setCartItems(cartData)
        try {
            await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0

        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items)
            if (!itemInfo) continue

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return totalAmount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list", { withCredentials: true })
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const getUserCart = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/cart/get", {}, { withCredentials: true })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const addToWishlist = async (itemId) => {
        if (!isAuthenticated) {
            toast.error("Please login to your account to wishlist an item");
            return
        }
        try {
            const wishListData = structuredClone(wishlistItems || {});
            wishListData[itemId] = true;
            setWishlistItems(wishListData);

            const response = await axios.post(
                backendUrl + "/api/cart/wishlist/add",
                { itemId },
                { withCredentials: true }
            );

            if (!response.data.success) {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const removeFromWishlist = async (itemId) => {
        try {
            const wishListData = structuredClone(wishlistItems || {});
            delete wishListData[itemId];
            setWishlistItems(wishListData);

            const response = await axios.post(
                backendUrl + "/api/cart/wishlist/remove",
                { itemId },
                { withCredentials: true }
            );

            if (!response.data.success) {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const isWishListed = (itemId) => {
        return !!wishlistItems[itemId];
    };

    const getWishList = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/cart/wishlist", {}, { withCredentials: true })
            if (response.data.success) {
                setWishlistItems(response.data.wishList || {})
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            getUserCart();
            getWishList();
        } else {
            setCartItems({});
            setWishlistItems({});
        }
    }, [isAuthenticated]);

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, theme, setTheme, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setCartItems, getUserCart, wishlistItems, addToWishlist, removeFromWishlist, isWishListed, getWishList
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;