import { Router } from "express"
import { addToCart, updateCart, getUserCart, getWishList, addToWishList, removeFromWishList } from "../controllers/cart.controller.js"
import { authUser } from "../middleware/auth.js"

const cartRouter = Router()

cartRouter.post("/get", authUser, getUserCart)
cartRouter.post("/wishlist", authUser, getWishList)
cartRouter.post("/wishlist/add", authUser, addToWishList);
cartRouter.post("/wishlist/remove", authUser, removeFromWishList);
cartRouter.post("/add", authUser, addToCart)
cartRouter.post("/update", authUser, updateCart)

export default cartRouter