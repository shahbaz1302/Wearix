import { Router } from "express"
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, removeOrder } from "../controllers/order.controller.js"
import { adminAuth } from "../middleware/adminAuth.js"
import { authUser } from "../middleware/auth.js"

const orderRouter = Router()

orderRouter.post("/list", adminAuth, allOrders)
orderRouter.post("/status", adminAuth, updateStatus)
orderRouter.post("/remove-order", adminAuth, removeOrder)

orderRouter.post("/place", authUser, placeOrder)
orderRouter.post("/stripe", authUser, placeOrderStripe)
orderRouter.post("/razorpay", authUser, placeOrderRazorpay)

orderRouter.post("/user-orders", authUser, userOrders)

orderRouter.post("/verifyStripe", authUser, verifyStripe)
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay)

export default orderRouter